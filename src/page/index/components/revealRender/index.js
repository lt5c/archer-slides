import React, { Component } from 'react';
import { isChildOf } from 'utils';
import Reveal from 'reveal';

import './index.less';

class RevealRender extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.iframeDom = null;
    }

    componentDidUpdate() {
        // const iframe = this.iframeDom.contentDocument;
        // const slidesDom = iframe.getElementsByClassName('slides');
    }

    componentDidMount() {

    }

    render() {
        const { slides } = this.props;
        // return (
        //     showRevealRender ?
        //         <iframe ref={dom => { this.iframeDom = dom }} className="reveal-render" src="http://localhost:8000" />
        //         :
        //         null
        // );
        return {
            <div class="reveal">
    			<div class="slides">
    				<section>Slide 1</section>
    				<section>Slide 2</section>
    			</div>
    		</div>
        }
    }
}

export default RevealRender;
