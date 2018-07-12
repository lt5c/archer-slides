import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import Handsontable from 'handsontable';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';

import './index.less';

class ArcherTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED
        };
        this.tableDom = null;
    }

    componentDidMount() {
        this.hot = new Handsontable(this.tableDom, {
            data: this.props.data.data
        });
    }

    render() {
        let { cmpState } = this.state;
        let { data } = this.props;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState}>
                <div ref={dom => { this.tableDom = dom }} className="archer-table">
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTable;
