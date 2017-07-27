import {createStore, applyMiddleware, combineReducers} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createHashHistory from 'history/createHashHistory'

import account from './reducers/account'
import posts from './reducers/posts'

const history = createHashHistory();

const historyMiddleware = routerMiddleware(history);

const loggerMiddleware = store => next => action => {
  if (process.env.development) console.error(action);
  return next(action)
};

const create = window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore;

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
  historyMiddleware
)(create);


const createReducer = (asyncReducers) => {
  return combineReducers({
    router: routerReducer,
    account,
    posts,
    ...asyncReducers
  });
};

const store = createStoreWithMiddleware(createReducer({}), {});
store.asyncReducers = {};


const injectAsyncReducer = (name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

export {store, history, injectAsyncReducer}
export default store