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
import ArcherTable from '../slide-components/archer-table';

import { SLIDE_CMP_TYPE as TYPE } from '../constants/constants';

import './index.less';

window.sharedb = ShareDB.connect();

@inject('slidesStore')
@observer
class Wrapper extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};

        this.renderSlides = this.renderSlides.bind(this);
        this.applyKeyframe = this.applyKeyframe.bind(this);
        this.sharedb = window.sharedb;
    }

    componentDidMount() {
        this.listenServerOP();
    }

    // 监听server op
    listenServerOP() {
        const sharedb = this.sharedb;
        sharedb.subscribe(this.applyKeyframe);
        sharedb.on('op', (op, source) => {
            // if (!source) {
            this.applyKeyframe(sharedb.data);
            // }
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
                    return <ArcherTable data={item} path={path} key={id} />;
                default:
                    return null;
            }
        });
    }

    render() {
        let mainStyle = {
            height: (window.innerHeight - 50) + 'px',
        };

        return (
            <div className="wrapper">
                <div className="toolbar"></div>
                <div className="main" style={mainStyle}>
                    <div className="sidebar"></div>
                    <div className="editor">
                        {this.renderSlides()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Wrapper;
