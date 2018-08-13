import React, { Component } from 'react';
import { insertTab, removeTab, insertTable, insertImage, insertTextarea, insertTextarea2, insertShape } from 'page/common/db';
import {
    SHAPE_TRIANGLE_TYPE,
    SHAPE_RECTANGLE_TYPE,
    SHAPE_CIRCLE_TYPE
} from 'page/common/constants';
import Button from './button';

// import './index.less';

const toolList = [
    {
        key: 'play',
        name: '播放',
        callback: function() {
            this.props.commonStore.toggleShowRevealRender();
        }
    },
    {
        key: 'insert-tab',
        name: '插入幻灯片',
        callback: function() {
            const { curSlideIndex: index } = this.props.slidesStore;
            const newid = insertTab(index);
            // 可能存在异步问题
            this.props.slidesStore.selectTab(newid);
        }
    },
    {
        key: 'remove-tab',
        name: '删除当前幻灯片',
        callback: function() {
            const { slidesStore } = this.props;
            const { curSlideIndex, curSlideID } = slidesStore;
            const nextIndex = curSlideIndex === slidesStore.tabCount ? curSlideIndex - 1 : curSlideIndex + 1;
            const nextTabId = slidesStore.getTabID(nextIndex);
            // 先切好tab
            slidesStore.selectTab(nextTabId);
            // 再删除tab
            removeTab(curSlideIndex, curSlideID);
        }
    },
    {
        key: 'insert-table',
        name: '插入表格',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertTable(tabid);
        }
    },
    {
        key: 'insert-textarea',
        name: '插入文本(标题)',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertTextarea2(tabid);
        }
    },
    {
        key: 'insert-textarea',
        name: '插入文本(正文)',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertTextarea(tabid);
        }
    },
    {
        key: 'insert-image',
        name: '插入图片',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertImage(tabid);
        }
    },
    {
        key: 'insert-shape',
        name: '插入距形',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertShape(tabid, SHAPE_RECTANGLE_TYPE);
        }
    },
    {
        key: 'insert-shape',
        name: '插入三角形',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertShape(tabid, SHAPE_TRIANGLE_TYPE);
        }
    },
    {
        key: 'insert-shape',
        name: '插入圆形',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertShape(tabid, SHAPE_CIRCLE_TYPE);
        }
    },

];

class Toolbar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render() {
        return (<div className={'toolbar-wrapper'}>
            {
                toolList.map(item => {
                    return (
                        <Button key={item.name} item={item} {...this.props} />
                    );
                })
            }
        </div>);
    }
}

export default Toolbar;
