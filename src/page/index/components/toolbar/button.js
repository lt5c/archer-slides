import React, { Component } from 'react';

// import './index.less';

class Button extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        const { item } = this.props;

        return (
            <button className="button" onClick={item.callback.bind(this)}>
                {item.name}
            </button>
        );
    }
}

export default Button;
