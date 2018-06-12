import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import {
    LATEST_NEWS,
    LIKE_NEWS
} from '../../constants/constants';

import Touch from 'touch';
import classNames from 'classnames';
import './index.less';

function TabItem(item, key) {
    return (
        <li
            data-tab={item.label}
            key={key}
        >
            <Touch data-tab={item.label} onTap={this.switchTab}>{item.text}</Touch>
        </li>
    );
}

function TabHighlight(props) {
    let isActive = (props.active === LIKE_NEWS);

    return (
        <i className={classNames('icon-active', { 'pull-right': isActive })}></i>
    );
}

@pureRender
export default class Tab extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        this.tabs = [
            {
                label: LATEST_NEWS,
                text: '最新新闻'
            },
            {
                label: LIKE_NEWS,
                text: '我的收藏'
            }
        ];
        this.switchTab = this.switchTab.bind(this);
    }

    switchTab(e) {
        let tab = parseInt(e.target.dataset.tab, 10);

        this.props.updateActiveTab(tab);
    }

    render() {
        console.dev('render Tab');

        return (
            <div id="cm-tab">
                <div className="cm-tabs">
                    <nav className="nav ui-border-1px">
                        <ul className="title-list">
                            {this.tabs.map(TabItem, this)}
                        </ul>
                        <TabHighlight active={this.props.tabs} />
                    </nav>
                </div>
            </div>
        );
    }
}
