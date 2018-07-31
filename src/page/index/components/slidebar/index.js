import React, { Component } from 'react';
import Reveal from 'libs/reveal/reveal';

// import './index.less';

class Slidebar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    renderTab(tabid) {
        const { tabClickHandler } = this.props;
        return (
            <div key={tabid} className="tab" onClick={tabClickHandler} />
        );
    }

    render() {
        const { tabs } = this.props;

        return (
            <div className="slidebar-content-wrapper">
                {tabs.map((tabid) => this.renderTab(tabid))}
            </div>
        );
    }
}

export default RevealPlayer;
