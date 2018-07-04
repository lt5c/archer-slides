import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import clonedeep from 'lodash.clonedeep';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';
import { commitOP } from 'page/common/db';
import {isChildOf} from 'utils';

import './index.less';

class ArcherTextarea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED
        };
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.onGlobalMousedown);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cmpState === SLIDE_CMP_STATE.EDITING && this.state.cmpState !== SLIDE_CMP_STATE.EDITING) {
            this.textOP();
        }
        if (prevState.cmpState === SLIDE_CMP_STATE.SELECTED && this.state.cmpState === SLIDE_CMP_STATE.EDITING) {
            this.refs.editor.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.onGlobalMousedown);
    }

    textOP() {
        // 文字变更,组装op
        let text = this.refs.editor.innerText;
        let { data, path } = this.props;
        let op = [{
            p: path.concat('text'),
            od: data.text,
            oi: clonedeep(text)
        }];
        console.debug('at', 'op', 'text', op);
        commitOP(op, 'at', false);
    }

    onGlobalMousedown = e => {
        console.debug('cmp mousedown');
        const container = this.refs.editor.parentNode;
        if (this.state.cmpState !== SLIDE_CMP_STATE.UNSELECTED && !isChildOf(e.target, container)) {
            this.setState({
                cmpState: SLIDE_CMP_STATE.UNSELECTED
            });
        }
    }

    onClick() {
        console.debug('event click');
        const cmpState = Math.min(SLIDE_CMP_STATE.EDITING, this.state.cmpState + 1);
        // if (this.state.cmpState === SLIDE_CMP_STATE.UNSELECTED) {
        console.debug('event click', cmpState);
        this.setState({
            cmpState
        });
        // }
    }

    onBlur() {
        console.debug('event blur');
        this.setState({
            cmpState: SLIDE_CMP_STATE.UNSELECTED
        });
    }

    render() {
        const { data } = this.props;
        const { cmpState } = this.state;

        const defaultHandler = {
            onClick: this.onClick.bind(this),
            // onDoubleClick: this.onDbClick.bind(this),
            onBlur: this.onBlur.bind(this),
        };

        const editable = this.state.cmpState === SLIDE_CMP_STATE.SELECTED;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState} >
                <div ref='editor' contentEditable={editable} className="archer-textarea" {...defaultHandler}>
                    {data.text}
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTextarea;
