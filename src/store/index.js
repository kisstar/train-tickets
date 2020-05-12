import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const storeEnhancer = applyMiddleware(ReduxThunk);
const reducer = combineReducers(reducers);
const storeEnhancerStoreCreator = storeEnhancer(createStore);
const store = storeEnhancerStoreCreator(reducer);

export default store;
