import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
);