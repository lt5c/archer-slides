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
    }

    componentDidMount() {
      if (this.state.editable) {
        this.refs.editor.focus();
      }
    }

    textOP() {
      //文字变更,组装op
      let text = this.refs.editor.innerText;
      let {data, path, jsonOP} = this.props;
      let op = [{
        p: path.concat('text'),
        od: data.text,
        oi: clonedeep(text)
      }];
      console.debug(op);
      jsonOP(op, 'at', false);
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

      return (
          <Rnd {...rndConfig}>
            <div
              ref='editor'
              className='textarea-editor'
              onDoubleClick={this.onDbClick}
              onBlur={this.onBlur}
              contentEditable={editable}/>
          </Rnd>
      );
    }
}

export default ArcherTextarea;
