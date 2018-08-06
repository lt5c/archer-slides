import React, { Component } from 'react';
import ArcherRnd from '../archer-rnd';
import { SLIDE_CMP_STATE } from 'page/index/constants/constants';
import { isChildOf } from 'utils';

import './index.less';

class ArcherImage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cmpState: SLIDE_CMP_STATE.UNSELECTED
        };
        this.imageDom = null;
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.onGlobalMouseup);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onGlobalMouseup);
    }

    onGlobalMouseup = e => {
        console.dev('global mouseup');
        const container = this.imageDom.parentNode;
        const { cmpState } = this.state;
        if (cmpState === SLIDE_CMP_STATE.SELECTED && !isChildOf(e.target, container)) {
            this.setState({
                cmpState: SLIDE_CMP_STATE.UNSELECTED
            });
        }
    }

    onMouseDown(e) {
        this.setState({
            cmpState: SLIDE_CMP_STATE.SELECTED
        });
    }

    render() {
        let { cmpState } = this.state;
        let { data } = this.props;

        let imgHandler = {
            onMouseDown: this.onMouseDown.bind(this)
        };

        const imgStyle = {
            backgroundImage: `url(${data.img})`,
        };

        return (
            <ArcherRnd {...this.props} cmpState={cmpState}>
                <div
                    ref={dom => { this.imageDom = dom }}
                    className="archer-image"
                    {...imgHandler}
                    style={imgStyle}>
                </div>
            </ArcherRnd>
        );
    }
}

export default ArcherImage;
