import React, { Component } from 'react';
import Connect from '../../connect/connect';
import ArcherRnd from '../archer-rnd';
import clonedeep from 'lodash.clonedeep';

import './index.less';

class ArcherTextarea extends Component {
    constructor(props, context) {
        super(props, context);

        this.onBlur = this.onBlur.bind(this);
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

    onBlur() {
      this.textOP();
    }

    render() {
      let {data, editable} = this.props;
      let text = data.text;

      return (
          <div
            ref='editor'
            className='archer-textarea'
            onBlur={this.onBlur}
            contentEditable={editable}>
            {text}
          </div>
      );
    }
}

export default ArcherTextarea;
