import React, { Component } from 'react';
import Connect from '../../connect/connect';
import ArcherRnd from '../archer-rnd';
import ArcherTextarea from '../archer-textarea';
import clonedeep from 'lodash.clonedeep';

import './index.less';

class ArcherText extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false,
        };


        this.onDbClick = this.onDbClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidMount() {
      // if (this.state.editable) {
      //   this.refs.editor.focus();
      // }
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
    }

    render() {
      let {editable} = this.state;

      return (
          <ArcherRnd {...this.props} editable={editable}>
            <div className='archer-text' onDoubleClick={this.onDbClick} onBlur={this.onBlur}>
              <ArcherTextarea {...this.props} editable={editable}/>
            </div>
          </ArcherRnd>
      );
    }
}

export default ArcherText;
