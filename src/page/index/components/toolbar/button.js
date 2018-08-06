import React, { Component } from 'react';
import {
    inject,
    observer
} from 'mobx-react';
// import './index.less';

@inject('slidesStore')

@observer
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
