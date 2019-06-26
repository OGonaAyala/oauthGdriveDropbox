import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filesReducer from './reducers/filesReducer';

const mainReducer = combineReducers({
  filesReducer: filesReducer,
});

export default createStore(mainReducer, applyMiddleware(thunk));
