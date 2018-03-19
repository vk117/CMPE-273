import {createStore, compse} from 'redux';
import {username, password, uname} from './data/users';
import {mainReducer} from './reducers/index';

const defaultState = {
    username: username,
    password: password,
    uname: uname
};

const store = createStore(mainReducer, defaultState);

export default store;