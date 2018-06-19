import React, { Component } from 'react';
import Connect from '../../connect/connect';
import Rnd from 'react-rnd';
import clonedeep from 'lodash.clonedeep';

import './index.less';

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
      //位置变动,组装op
      let {data, path, commitOP} = this.props;
      if (draggableData.x !== data.x || draggableData.y !== data.y) {
        let op = [{
          p: path.concat('position'),
          od: data.position,
          oi: {x: draggableData.x, y: draggableData.y}
        }];
        console.debug('at','op','drag',op);
        commitOP(op, 'at', false);
      }
    }

    sizeOP(delta, position) {
      console.debug(delta);
      //大小变动,组装op
      let {data, path, commitOP} = this.props;
      let op = [];
      if (position.x !== data.position.x || position.y !== data.position.y) {
        op.push({
          p: path.concat('position'),
          od: data.position,
          oi: {x: position.x, y: position.y}
        })
      }
      if (delta.width !==0 || delta.height !==0) {
        let size = {
          width: data.size.width + delta.width,
          height: data.size.height + delta.height,
        }
        op.push({
          p: path.concat('size'),
          od: data.size,
          oi: size
        })
      }

      console.debug('at','op','resize',op);
      commitOP(op, 'at', false);
    }

    onResizeStart() {
      this.setState({
        resizing: true
      })
    }

    onResizeStop(e, dir, ref, delta, position) {
      this.setState({
        resizing: false
      })

      this.sizeOP(delta, position);
    }

    render() {
      let {resizing} = this.state;
      let {data, editable} = this.props;

      //生成拖拽框的配置
      let rndConfig = {
        bound: 'parent',
        disableDragging: editable,
        enableResizing: {
          bottom: !editable,
          bottomLeft: !editable,
          bottomRight: !editable,
          left: !editable,
          right: !editable,
          top: !editable,
          topLeft: !editable,
          topRight: !editable,
        }
      }

      //生成拖拽框的style
      let rndStyle = resizing ? {} : {
        position: data.position,
        size: data.size
      }

      let rndHandler = {
        onDragStop: this.positionOP,
        onResizeStart: this.onResizeStart,
        onResizeStop: this.onResizeStop,
      }

      return (
          <Rnd {...rndConfig} {...rndStyle} {...rndHandler} >
            {this.props.children}
          </Rnd>
      );
    }
}

export default ArcherRnd;
