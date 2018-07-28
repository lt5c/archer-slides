import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import Handsontable from 'handsontable'
import { SLIDE_CMP_STATE, DEFAULT_TABLE_SETTINGS } from 'page/index/constants/constants';
import assign from 'lodash.assign';

import './index.less';
import 'handsontable/dist/handsontable.full.css';


class ArcherTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED,
            shouldUpdate: true,
        };
        this.hot = null;
        this.table = null;
    }

    componentDidMount() {
        this.setState({
            shouldUpdate: false
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 真正更正表格的地方
        if (!this.state.shouldUpdate) {
            this.hot.updateSettings(nextProps.data.settings);
        }

        return this.state.shouldUpdate;
    }

    componentDidUpdate() {
        /**
         * 本来应该在componetDidMount的时候渲染表格
         * 但是用了Rnd这个组件，导致在componetDidMount时拿不到table dom
         * 所以把表格渲染延迟到componentDidUpdate
         */

        const container = this.table;
        const settings = assign(DEFAULT_TABLE_SETTINGS, this.props.data.settings);
        window.hot = this.hot = new Handsontable(container, settings);
    }

    onDataChange() {
        const data = this.hot.getData();
        
    }

    render() {
        let { cmpState } = this.state;
        let { data, id } = this.props;

        const { width, height } = data.size;
        this.id = `hot${id}`;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState}>
                <div ref={dom => { this.table = dom }} id={this.id} className="archer-table">
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTable;
