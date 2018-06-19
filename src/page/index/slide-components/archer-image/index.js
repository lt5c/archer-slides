import React, { Component } from 'react';
import Connect from '../../connect/connect';
import ArcherRnd from '../archer-rnd';
import clonedeep from 'lodash.clonedeep';

import './index.less';

class ArcherImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false,
        };
    }

    componentDidMount() {
      // if (this.state.editable) {
      //   this.refs.editor.focus();
      // }
    }



    render() {
      let {editable} = this.state;
      let {data} = this.props;

      return (
          <ArcherRnd {...this.props} editable={editable}>
            <div className='archer-image'>
              <img src={data.imgSrc} />
            </div>
          </ArcherRnd>
      );
    }
}

export default ArcherImage;
