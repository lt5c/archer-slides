import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import Handsontable from 'handsontable'
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';

import './index.less';

import 'handsontable/dist/handsontable.full.css';


class ArcherTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED
        };
        this.hot = null;
        this.id = null;
    }

    componentDidMount() {
        const container = document.getElementById(this.id);
        this.hot = new Handsontable(container, {
            data: this.props.data.data
        });
        console.log('test');
    }

    render() {
        let { cmpState } = this.state;
        let { data, id } = this.props;

        const { width, height } = data.size;
        this.id = `hot${id}`;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState}>
                <div id={this.id} className="archer-table">
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTable;
