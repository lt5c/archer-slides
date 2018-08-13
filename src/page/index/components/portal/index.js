import React, { Component } from 'react';

import './index.less';

class Portal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {

        return (
            <div className="portal">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Portal;
