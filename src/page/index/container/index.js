import React, { Component } from 'react';
import {
    inject,
    observer
} from 'mobx-react';
import {
    action
} from 'mobx';
import ShareDB from 'page/common/sharejs';
import clonedeep from 'lodash.clonedeep';

import ArcherTextarea from '../slide-components/archer-textarea';
import ArcherImage from '../slide-components/archer-image';
import ArcherTableWrapper from '../slide-components/archer-table/index.js';

import RevealRender from '../components/revealRender';

import { SLIDE_CMP_TYPE as TYPE } from '../constants/constants';

import './index.less';

window.sharedb = ShareDB.connect();

@inject('slidesStore', 'commonStore')

@observer
class Wrapper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.renderSlides = this.renderSlides.bind(this);
        this.applyKeyframe = this.applyKeyframe.bind(this);
        this.sharedb = window.sharedb;
        this.op_source = false;
    }

    componentDidMount() {
        this.listenServerOP();
    }

    // 监听server op
    listenServerOP() {
        const sharedb = this.sharedb;
        sharedb.subscribe(this.applyKeyframe);
        sharedb.on('op', (op, source) => {
            this.op_source = source;
            this.applyKeyframe(sharedb.data);
        });
    }

    applyKeyframe() {
        let { onKeyframe } = this.props.slidesStore;
        let keyframe = clonedeep(this.sharedb.data);
        onKeyframe(keyframe);
    }

    renderSlides() {
        let slides = this.props.slidesStore.slides || {};

        return Object.keys(slides).map(id => {
            let item = slides[id];
            let path = [id];
            switch (item.type) {
                case TYPE.TEXTAREA:
                    return <ArcherTextarea data={item} path={path} key={id} />;
                case TYPE.IMAGE:
                    return <ArcherImage data={item} path={path} key={id} />;
                case TYPE.TABLE:
                    return <ArcherTableWrapper data={item} path={path} key={id} id={id} op_source={this.op_source} />;
                default:
                    return null;
            }
        });
    }

    render() {
        let mainStyle = {
            height: (window.innerHeight - 50) + 'px',
        };
        const { commonStore, slidesStore } = this.props;

        return (
            <div className="wrapper">
                <div className="toolbar">
                    <button onClick={this.props.commonStore.toggleShowRevealRender} >预览</button>
                </div>
                <div className="main" style={mainStyle}>
                    <div className="sidebar"></div>
                    <div className="editor">
                        {this.renderSlides()}
                    </div>
                </div>
                {commonStore.showRevealRender ?
                    <RevealRender slides={slidesStore.slides} />
                    :
                    null
                }
            </div>
        );
    }
}

export default Wrapper;
