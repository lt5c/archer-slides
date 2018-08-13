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
        const { slidesStore } = this.props;

        return (
            <div className="reveal-wrapper">
                <div className="reveal">
                    <div className="slides">
                        {
                            slidesStore.tabs.map(tabid => {
                                const slide = slidesStore.getSlideByTabID(tabid);
                                return (
                                    <section key={tabid}>
                                        {
                                            this.renderSection(slide)
                                        }
                                    </section>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RevealPlayer;
