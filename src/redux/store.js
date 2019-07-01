import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import filesReducer from './reducers/filesReducer';
import tokenReducer from './reducers/tokenReducer';

const mainReducer = combineReducers({
  filesReducer: filesReducer,
  tokenReducer: tokenReducer
});

export default createStore(mainReducer, applyMiddleware(thunk));
