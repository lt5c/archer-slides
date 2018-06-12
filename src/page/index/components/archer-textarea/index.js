import React, { Component } from 'react';
import Connect from '../../connect/connect';
import Rnd from 'react-rnd';

import './index.less';

class ArcherTextarea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <Rnd bounds={'parent'}> <span>hello</span> </Rnd>
        );
    }
}

export default Connect(ArcherTextarea);
