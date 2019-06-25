import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import googleReducer from './reducers/googleReducer';


const mainReducer = combineReducers({
    google: googleReducer
});

export default createStore(
    mainReducer,
    applyMiddleware(thunk)
);