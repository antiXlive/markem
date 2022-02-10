import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

import authReducer from './reducers/authReducer.js';
import dbReducer from './reducers/dbReducer.js';
import markemReducer from './reducers/markemReducer.js';

const rootReducer = combineReducers(
    {auth: authReducer, dbReducer, markemReducer},
);

const configureStore = () => {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk)
        )
    );
}

export default configureStore;