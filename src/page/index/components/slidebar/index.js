import React, { Component } from 'react';
// import Reveal from 'libs/reveal/reveal';
import {
    inject,
    observer
} from 'mobx-react';

import './index.less';

@inject('slidesStore')

@observer
class Slidebar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    renderTab(tabid, index, focus) {
        const { clickHandler } = this.props;
        return (
            <div key={tabid} className={`tab ${focus ? 'focus' : ''}`} onClick={() => clickHandler(tabid)}>
                <div>{index + 1}</div>
            </div>
        );
    }

    render() {
        const { slidesStore: { tabs, curSlideID }} = this.props;

        return (
            <div className="slidebar-content-wrapper">
                {tabs.map((tabid, index) => this.renderTab(tabid, index, tabid === curSlideID))}
            </div>
        );
    }
}

export default Slidebar;
