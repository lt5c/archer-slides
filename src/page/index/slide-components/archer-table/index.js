import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import ArcherTable from './table';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';
import { isChildOf } from 'utils';

import './index.less';

class ArcherTableWrapper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED,
        };
        this.ref = null;
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.onGlobalMouseup);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onGlobalMouseup);
    }

    onGlobalMouseup = e => {
        console.dev('global mouseup');
        const container = this.ref.parentNode;
        const { cmpState } = this.state;
        if (cmpState === SLIDE_CMP_STATE.SELECTED && !isChildOf(e.target, container)) {
            this.setState({
                cmpState: SLIDE_CMP_STATE.UNSELECTED
            });
        } else if (cmpState === SLIDE_CMP_STATE.UNSELECTED && isChildOf(e.target, container)) {
            this.setState({
                cmpState: SLIDE_CMP_STATE.SELECTED
            });
        }
    }

    render() {
        let { cmpState } = this.state;

        const className = `archer-table-wrapper ${cmpState === SLIDE_CMP_STATE.SELECTED ? 'selected' : 'unselected'}`;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState} className={className} >
                <div ref={dom => { this.ref = dom }} >
                    <ArcherTable {...this.props} />
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTableWrapper;
