import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';


const router = routerMiddleware(browserHistory);

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, router)
  );


export default configureStore;
