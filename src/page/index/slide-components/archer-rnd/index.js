import React, { Component } from 'react';
import Rnd from 'react-rnd';
import { commitOP } from 'page/common/db';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';

/**
 * @prop {object} data 子组件数据
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
            let op = [{
                p: path.concat('position'),
                od: data.position,
                oi: { x: draggableData.x, y: draggableData.y }
            }];
            console.debug('at', 'op', 'drag', op);
            commitOP(op, 'at', false);
        }
    }

    sizeOP(delta, position) {
        console.debug(delta);
        // 大小变动,组装op
        let { data, path } = this.props;
        let op = [];
        if (position.x !== data.position.x || position.y !== data.position.y) {
            op.push({
                p: path.concat('position'),
                od: data.position,
                oi: { x: position.x, y: position.y }
            });
        }
        if (delta.width !== 0 || delta.height !== 0) {
            let size = {
                width: data.size.width + delta.width,
                height: data.size.height + delta.height,
            };
            op.push({
                p: path.concat('size'),
                od: data.size,
                oi: size
            });
        }

        console.debug('at', 'op', 'resize', op);
        commitOP(op, 'at', false);
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
        let { data, cmpState, disableResizing, className } = this.props;

        // 生成拖拽框的配置
        const dragable = cmpState !== SLIDE_CMP_STATE.UNSELECTED;
        const resizable = !disableResizing && cmpState !== SLIDE_CMP_STATE.UNSELECTED;
        const size = '10px';
        let rndConfig = {
            bound: 'parent',
            disableDragging: !dragable,
            enableResizing: {
                bottom: resizable,
                bottomLeft: resizable,
                bottomRight: resizable,
                left: resizable,
                right: resizable,
                top: resizable,
                topLeft: resizable,
                topRight: resizable,
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
            size: data.size
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
