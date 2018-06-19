import React, { Component } from 'react';
import Connect from '../../connect/connect';
import ArcherRnd from '../archer-rnd';
import clonedeep from 'lodash.clonedeep';
import Handsontable from 'handsontable';

import './index.less';

class ArcherTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          editable: false,
        };
    }

    componentDidMount() {
      
    }



    render() {
      let {editable} = this.state;
      let {data} = this.props;

      return (
          <ArcherRnd {...this.props} editable={editable}>
            <div ref='table' className='archer-table'>
            </div>
          </ArcherRnd>
      );
    }
}

export default ArcherTable;
