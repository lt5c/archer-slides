import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import Handsontable from 'handsontable'
import { DEFAULT_TABLE_SETTINGS } from 'page/index/constants/constants';
import assign from 'lodash.assign';
// import { ArcherAction } from 'page/common/db'
import { onDataChange, onRowsChange, onColsChange } from './listener';

import 'handsontable/dist/handsontable.full.css';


class ArcherTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
        // op_source: true from server, false frmo local
        if (!this.state.shouldUpdate && !nextProps.op_source) {
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
        this.hot.addHook('afterChange', onDataChange.bind(this));
        this.hot.addHook('afterCreateRow', onRowsChange.bind(this));
        this.hot.addHook('afterRemoveRow', onRowsChange.bind(this));
        this.hot.addHook('afterCreateCol', onColsChange.bind(this));
        this.hot.addHook('afterRemoveCol', onColsChange.bind(this));
    }

    render() {
        let { id } = this.props;

        this.id = `hot-${id}`;

        return (
            <div ref={dom => { this.table = dom }} id={this.id} className="archer-table">
            </div>
        );
    }
}

export default ArcherTable;
