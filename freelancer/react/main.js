import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
import {SignUp} from './components/SignUp';
import {Login} from './components/Login';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
);