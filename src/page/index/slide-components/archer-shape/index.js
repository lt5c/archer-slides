import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
    observable,
    // computed,
    action
} from 'mobx';
import ArcherRnd from '../archer-rnd';
import { SLIDE_CMP_STATE as STATE } from 'page/index/constants/constants';
import { isChildOf } from 'utils';
import { shapeStyle } from './style';

import './index.less';

/**
 * 九宫格图形
 * @extends Component
 */
@observer
class ArcherShape extends Component {

    constructor(props, context) {
        super(props, context);
        this.shapeDom = null;
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.onGlobalMouseup);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onGlobalMouseup);
    }

    @observable cmpState = STATE.UNSELECTED;

    onGlobalMouseup = e => {
        console.dev('global mouseup');
        const container = this.shapeDom.parentNode;
        const cmpState = this.cmpState;
        if (cmpState === STATE.SELECTED && !isChildOf(e.target, container)) {
            this.setCmpState(STATE.UNSELECTED);
        }
    }

    onMouseDown(e) {
        this.setCmpState(STATE.SELECTED);
    }

    @action
    setCmpState = cmpState => {
        this.cmpState = cmpState;
    }


    render() {
        let cmpState = this.cmpState;
        let { data } = this.props;

        let handler = {
            onMouseDown: this.onMouseDown.bind(this)
        };

        const { subtype, size: { width, height }} = data;
        const style = shapeStyle(subtype, width, height);

        return (
            <ArcherRnd {...this.props} cmpState={cmpState}>
                <div
                    ref={dom => { this.shapeDom = dom }}
                    className="archer-shape"
                    {...handler}
                    style={style}>
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherShape;
