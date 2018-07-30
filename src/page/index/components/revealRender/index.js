import React, { Component } from 'react';
import { isChildOf } from 'utils';

import './index.less';

class RevealRender extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.iframeDom = null;
    }

    componentDidUpdate() {
        const iframe = this.iframeDom.contentDocument;
        const slidesDom = iframe.getElementsByClassName('slides');
    }

    render() {
        const { showRevealRender, slides } = this.props;
        return (
            showRevealRender ?
                <iframe ref={dom => { this.iframeDom = dom }} className="reveal-render" src="http://localhost:8000" />
                :
                null
        );
    }
}

export default RevealRender;
