import React, { Component } from 'react';
import {
    inject,
    observer
} from 'mobx-react';
import ShareDB from 'page/common/sharejs';
import clonedeep from 'lodash.clonedeep';

import ArcherTextarea from '../slide-components/archer-textarea';
import ArcherImage from '../slide-components/archer-image';
import ArcherTableWrapper from '../slide-components/archer-table/index.js';
import ArcherShape from '../slide-components/archer-shape';

import RevealPlayer from '../components/revealPlayer';
import Slidebar from '../components/slidebar';
import Toolbar from '../components/toolbar';

import { SLIDE_CMP_TYPE as TYPE } from '../constants/constants';

import './index.less';

window.sharedb = ShareDB.connect();

@inject('slidesStore', 'commonStore')

@observer
class Wrapper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.renderSlide = this.renderSlide.bind(this);
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
        console.dev('keyframe', keyframe);
        onKeyframe(keyframe);
    }

    /**
     * 渲染focus slide
     * @return {React} focus slide
     */
    renderSlide() {
        const slide = this.props.slidesStore.curSlide || {};
        const slideId = this.props.slidesStore.focusId;
        const dir = ['slides', slideId];

        return Object.keys(slide).map(id => {
            let item = slide[id];
            let path = dir.concat(id);
            switch (item.type) {
                case TYPE.TEXTAREA:
                    return <ArcherTextarea data={item} path={path} key={id} />;
                case TYPE.IMAGE:
                    return <ArcherImage data={item} path={path} key={id} />;
                case TYPE.TABLE:
                    return <ArcherTableWrapper data={item} path={path} key={id} id={id} op_source={this.op_source} />;
                case TYPE.SHAPE:
                    return <ArcherShape data={item} path={path} key={id} />;
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
                    <Toolbar {...this.props} />
                </div>
                <div className="main" style={mainStyle}>
                    <div className="sidebar">
                        <Slidebar tabs={slidesStore.tabs} clickHandler={slidesStore.selectTab} />
                    </div>
                    <div className="editor-wrapper">
                        <div className="editor">
                            {this.renderSlide()}
                        </div>
                    </div>
                </div>
                {commonStore.showRevealRender ?
                    <RevealPlayer slides={slidesStore.curSlide} />
                    :
                    null
                }
            </div>
        );
    }
}

export default Wrapper;
