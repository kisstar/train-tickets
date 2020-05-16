import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

const middleWares = [ReduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const storeEnhancer = applyMiddleware(...middleWares);
const reducer = combineReducers(reducers);
const storeEnhancerStoreCreator = storeEnhancer(createStore);
const store = storeEnhancerStoreCreator(reducer);

export default store;
