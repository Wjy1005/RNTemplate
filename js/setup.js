/**
 * Created by git on 16/8/29.
 */

if(!__DEV__) {
    console = {};
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

import React from 'react';
import App from './App';


function setup(): React.Component {
    class Root extends React.Component {
        constructor() {
            super();
        }
        render() {
            return <App />
        }

    }

    return Root;
}

module.exports = setup;