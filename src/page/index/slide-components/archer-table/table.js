import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import Handsontable from 'handsontable'
import { DEFAULT_TABLE_SETTINGS } from 'page/index/constants/constants';
import assign from 'lodash.assign';
// import { ArcherAction } from 'page/common/db'
import { registerHotListener } from './listener';

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
        const fromServer = !nextProps.op_source;
        console.dev('table render', fromServer);
        if (!this.state.shouldUpdate) {
            const serverSettings = fromServer ? nextProps.data.settings : {};
            const sizeSettings = this.recalculate(nextProps.data);
            const localSettings = assign(serverSettings, sizeSettings);

            this.hot.updateSettings(localSettings);
        }

        return this.state.shouldUpdate;
    }

    componentDidUpdate() {
        /**
         * 本来应该在componetDidMount的时候渲染表格
         * 但是用了Rnd这个组件，导致在componetDidMount时拿不到table dom
         * 所以把表格渲染延迟到componentDidUpdate
         */

        const { settings: serverSettings } = this.props.data;
        const sizeSettings = this.recalculate(this.props.data);
        const localSettings = assign(DEFAULT_TABLE_SETTINGS, serverSettings, sizeSettings);
        const container = this.table;
        this.hot = new Handsontable(container, localSettings);
        registerHotListener.bind(this)();
    }

    /**
     * recalculate rowHeights and colWidths by size
     * @return {object} settings
     */
    recalculate(tableData) {
        const { size: { width, height }, settings } = tableData;
        const data = settings.data;

        const rowCount = (data.length || 1);
        const rowHeights = height / rowCount;
        console.dev('rowHeights', rowHeights);

        const colCount = (data[0] && data[0].length || 1);
        const colWidths = width / colCount;
        console.dev('colWidths', colWidths);

        return { rowHeights, colWidths };
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
