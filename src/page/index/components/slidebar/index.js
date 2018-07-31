import React, { Component } from 'react';
import Reveal from 'libs/reveal/reveal';

import './index.less';

class Slidebar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    renderTab(tabid, index) {
        const { clickHandler } = this.props;
        return (
            <div key={tabid} className="tab" onClick={() => clickHandler(tabid)}>
                <div>{index+1}</div>
            </div>
        );
    }

    render() {
        const { tabs } = this.props;

        return (
            <div className="slidebar-content-wrapper">
                {tabs.map((tabid, index) => this.renderTab(tabid, index))}
            </div>
        );
    }
}

export default Slidebar;
