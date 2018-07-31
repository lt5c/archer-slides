import React, { Component } from 'react';
// import { isChildOf } from 'utils';
import Reveal from 'libs/reveal/reveal';
import { renderTemplate } from './template';

import './index.less';
import 'libs/reveal/css/reveal.css';
import 'libs/reveal/css/theme/black.css';

class RevealPlayer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.iframeDom = null;
    }

    componentDidMount() {
        Reveal.initialize();
    }

    renderSection(slide) {
        return Object.keys(slide).map(id => {
            const item = slide[id];
            return renderTemplate(item);
        });
    }

    render() {
        const { slides } = this.props;
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
                        <section>
                            {
                                this.renderSection(slides)
                            }
                        </section>
                        <section>Slide 2</section>
                    </div>
                </div>
            </div>
        );
    }
}

export default RevealPlayer;
