import React, { Component } from 'react';
import Connect from '../../connect/connect';
import Rnd from 'react-rnd';
import clonedeep from 'lodash.clonedeep';

import './index.less';

class ArcherTextarea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false,
        };


        this.onDbClick = this.onDbClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.positionOP = this.positionOP.bind(this);
    }

    componentDidMount() {
      if (this.state.editable) {
        this.refs.editor.focus();
      }
    }

    textOP() {
      //文字变更,组装op
      let text = this.refs.editor.innerText;
      let {data, path, commitOP} = this.props;
      let op = [{
        p: path.concat('text'),
        od: data.text,
        oi: clonedeep(text)
      }];
      console.debug('at','op','text',op);
      commitOP(op, 'at', false);
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
        console.debug('at','op','position',op);
        commitOP(op, 'at', false);
      }
    }

    onDbClick() {
      this.setState({
        editable: true
      })
    }

    onBlur() {
      this.setState({
        editable: false
      })
      this.textOP();
    }

    render() {
      let {editable} = this.state;
      let {data} = this.props;

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
      let rngStyle = {
        position: data.position,
        size: data.size
      }

      let rngHandler = {
        onDragStop: this.positionOP,
      }

      let text = data.text;

      return (
          <Rnd {...rndConfig} {...rngStyle} {...rngHandler}>
            <div
              ref='editor'
              className='textarea-editor'
              onDoubleClick={this.onDbClick}
              onBlur={this.onBlur}
              contentEditable={editable}>
              {text}
            </div>
          </Rnd>
      );
    }
}

export default ArcherTextarea;
