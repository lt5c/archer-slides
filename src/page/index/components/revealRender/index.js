import React, { Component } from 'react';
// import { isChildOf } from 'utils';
import Reveal from 'libs/reveal/reveal';

import './index.less';
import 'libs/reveal/css/reveal.css';
// import 'libs/reveal/css/theme/night.css';
// import 'libs/reveal/lib/font/source-sans-pro/source-sans-pro.css'

class RevealRender extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.iframeDom = null;
    }

    componentDidMount() {
        Reveal.initialize();
    }

    render() {
        // const { slides } = this.props;
        // return (
        //     showRevealRender ?
        //         <iframe ref={dom => { this.iframeDom = dom }} className="reveal-render" src="http://localhost:8000" />
        //         :
        //         null
        // );
        return (
            <div className="reveal-wrapper">
                <div className="reveal">
                    <div className="slides">
                        <section>Slide 1</section>
                        <section>Slide 2</section>
                    </div>
                </div>
            </div>
        );
    }
}

export default RevealRender;
