// TODO:textarea改为表格editor形式(编辑时不同步,后来后覆盖),后续应该改为文本editor形式(协同编辑),目前采用的json0协同算法,也是支持这个能力的
// TODO:把textarea换成draft-js

import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import clonedeep from 'lodash.clonedeep';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';
import ArcherAction from 'page/common/db/ArcherAction';
import { isChildOf, throttle } from 'utils';

import './index.less';

/**
 * AT格式
 * {
       type: 'at',
       position: {
           x: 50,
           y: 50,
       },
       size: {
           width: 100,
           height: 20,
       },
       text: 'hello world',
       style: {
           fontSize: '16',
           textAlign: 'center',
       }
   }
 */
class ArcherTextarea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED,  // 组件三态: 浏览态、选中态、编辑态
        };

        // 只读属性
        this.wrapper = null;
        this.editor = null;
        this.getWrapper = e => {
            this.wrapper = e;
        };
        this.getEditor = e => {
            this.editor = e;
        };

        this.throttle = throttle(300); // 300ms的节流函数
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.onGlobalMouseup);
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevState.cmpState === SLIDE_CMP_STATE.EDITING && this.state.cmpState !== SLIDE_CMP_STATE.EDITING) {
        //     this.textOP();
        // }
        // if (prevProps.data.text !== this.props.data.text) {
        //     this.setState({
        //         editorValue: this.props.data.text
        //     });
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onGlobalMouseup);
    }

    textOP(text) {
        // 文字变更,组装op
        // let text = this.editor.value;
        console.debug(text);
        let { data, path } = this.props;
        if (!text || text === data.text) {
            return;
        }
        const subPath = path.concat('text');
        const action = ArcherAction.getObjectChangeAction(subPath, clonedeep(text), data.text);
        ArcherAction.submit(action);
    }

    onGlobalMouseup = e => {
        console.debug('global mouseup');
        const container = this.wrapper.parentNode;
        if (this.state.cmpState === SLIDE_CMP_STATE.EDITING) {
            if (!isChildOf(e.target, container)) {
                this.setState({
                    cmpState: SLIDE_CMP_STATE.UNSELECTED
                });
            } else if (!isChildOf(e.target, this.wrapper)) {
                this.setState({
                    cmpState: SLIDE_CMP_STATE.SELECTED
                });
            }
        } else if (this.state.cmpState === SLIDE_CMP_STATE.SELECTED) {
            if (!isChildOf(e.target, container)) {
                this.setState({
                    cmpState: SLIDE_CMP_STATE.UNSELECTED
                });
            }
        }
    }

    onMouseDown(e) {
        console.debug('textarea mousedown');
        if (this.state.cmpState === SLIDE_CMP_STATE.EDITING) {
            e.stopPropagation();
        }
    }

    onMouseUp(e) {
        console.debug('textarea mouseup');
        const cmpState = this.state.cmpState;

        if (cmpState === SLIDE_CMP_STATE.UNSELECTED) {
            this.setState({
                cmpState: SLIDE_CMP_STATE.EDITING
            });
        }
    }

    onKeyUp(e) {
        this.throttle(this.textOP.bind(this));
    }

    onChange(e) {
        this.textOP(e.target.value);
    }

    onBlur(e) {
        this.textOP(e.target.value);
    }

    render() {
        const { data } = this.props;
        const { cmpState } = this.state;

        const textareaHandler = {
            onMouseDown: this.onMouseDown.bind(this),
            onMouseUp: this.onMouseUp.bind(this),
            // onKeyUp: this.onKeyUp.bind(this),
            // onChange: this.onChange.bind(this),
            onBlur: this.onBlur.bind(this),
        };

        const editorValue = cmpState === SLIDE_CMP_STATE.EDITING ?
            { defaultValue: data.text }
            :
            { value: data.text };

        const editable = cmpState !== SLIDE_CMP_STATE.UNSELECTED;

        return (
            <ArcherRnd {...this.props} cmpState={cmpState} >
                <div ref={this.getWrapper} className={`archer-textarea-wrapper ${editable ? 'edit' : ''}`}>
                    <textarea
                        ref={this.getEditor}
                        className={`archer-textarea ${editable ? 'edit' : ''}`}
                        readOnly={!editable}
                        {...editorValue}
                        {...textareaHandler}
                        style={data.style}
                    />
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherTextarea;
