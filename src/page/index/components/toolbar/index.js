import React, { Component } from 'react';
import { insertTab, insertTable, insertImage, insertTextarea } from 'page/common/db';
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
        key: 'insert-table',
        name: '插入表格',
        callback: function() {
            const { curSlideID: tabid } = this.props.slidesStore;
            insertTable(tabid);
        }
    },
    {
        key: 'insert-textarea',
        name: '插入文本',
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
