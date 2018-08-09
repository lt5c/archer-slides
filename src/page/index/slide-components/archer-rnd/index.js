import React, { Component } from 'react';
import Rnd from 'react-rnd';
import ArcherAction from 'page/common/db/ArcherAction';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';

/**
 * @prop {object} data 子组件数据
 * @prop {object} disableResizingX 禁止resize X
 * @prop {object} disableResizingY 禁止resize Y
 */
class ArcherRnd extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            resizing: false,
        };

        this.positionOP = this.positionOP.bind(this);
        this.sizeOP = this.sizeOP.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResizeStop = this.onResizeStop.bind(this);
    }

    positionOP(e, draggableData) {
        // 位置变动,组装op
        let { data, path } = this.props;
        if (draggableData.x !== data.position.x || draggableData.y !== data.position.y) {
            const oldObj = data.position;
            const newObj = { x: draggableData.x, y: draggableData.y };
            const subPath = path.concat('position');
            const action = ArcherAction.getObjectChangeAction(subPath, oldObj, newObj);
            ArcherAction.submit(action);
        }
    }

    sizeOP(delta, position) {
        // 大小变动,组装op
        let { data, path } = this.props;
        // let op = [];
        let actions = [];
        if (position.x !== data.position.x || position.y !== data.position.y) {
            const subPath = path.concat('position');
            const newPosition = { x: position.x, y: position.y };
            const action = ArcherAction.getObjectChangeAction(subPath, data.position, newPosition);
            actions.push(action);
        }
        if (delta.width !== 0 || delta.height !== 0) {
            const subPath = path.concat('size');
            const size = {
                width: data.size.width + delta.width,
                height: data.size.height + delta.height,
            };
            const action = ArcherAction.getObjectChangeAction(subPath, data.size, size);
            actions.push(action);
        }

        ArcherAction.packageSubmit(...actions);
    }

    onResizeStart() {
        this.setState({
            resizing: true
        });
    }

    onResizeStop(e, dir, ref, delta, position) {
        this.setState({
            resizing: false
        });

        this.sizeOP(delta, position);
    }

    render() {
        let { resizing } = this.state;
        let { data, cmpState, className, disableResizingX, disableResizingY } = this.props;

        // 生成拖拽框的配置
        const dragable = cmpState !== SLIDE_CMP_STATE.UNSELECTED;
        const resizable = cmpState !== SLIDE_CMP_STATE.UNSELECTED;
        const size = '10px';
        let rndConfig = {
            bound: 'parent',
            disableDragging: !dragable,
            enableResizing: {
                bottom: resizable && !disableResizingY,
                bottomLeft: resizable && !disableResizingX && !disableResizingY,
                bottomRight: resizable && !disableResizingX && !disableResizingY,
                left: resizable && !disableResizingX,
                right: resizable && !disableResizingX,
                top: resizable && !disableResizingY,
                topLeft: resizable && !disableResizingX && !disableResizingY,
                topRight: resizable && !disableResizingX && !disableResizingY,
            },
            resizeHandleStyles: {
                bottom: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    left: '50%',
                    bottom: '0',
                    transform: 'translate(-50%, 50%)',
                },
                bottomLeft: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    left: '0',
                    bottom: '0',
                    transform: 'translate(-50%, 50%)',
                },
                bottomRight: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    right: '0',
                    bottom: '0',
                    transform: 'translate(50%, 50%)',
                },
                left: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    left: '0',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                },
                right: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    right: '0',
                    top: '50%',
                    transform: 'translate(50%, -50%)',
                },
                top: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    left: '50%',
                    top: '0',
                    transform: 'translate(-50%, -50%)',
                },
                topLeft: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    left: '0',
                    top: '0',
                    transform: 'translate(-50%, -50%)',
                },
                topRight: {
                    backgroundColor: 'green',
                    width: size,
                    height: size,
                    right: '0',
                    top: '0',
                    transform: 'translate(50%, -50%)',
                }
            },
        };

        //  生成拖拽框的style
        let rndStyle = resizing ? {} : {
            position: data.position,
            size: {
                width: disableResizingX ? '' : data.size.width,
                height: disableResizingY ? '' : data.size.height
            }
        };

        let rndHandler = {
            onDragStop: this.positionOP,
            onResizeStart: this.onResizeStart,
            onResizeStop: this.onResizeStop,
        };

        return (
            <Rnd {...rndConfig} {...rndStyle} {...rndHandler} className={className || ''} >
                {this.props.children}
            </Rnd>
        );
    }
}

export default ArcherRnd;
