import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import store from '../stores';

import IndexWrapper from '../container/index';
import DevTools from '../../common/devtools/DevTools';
import { DEBUG } from '../constants/constants';

// let store = configureStore(initialState);

let DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {
    render() {
        return (
            <Provider {...store}>
                <div>
                    {DevToolsWrapper}
                    <IndexWrapper />
                </div>
            </Provider>
        );
    }
}

// render(
//     <Root />,
//     document.getElementById('pages')
// );
