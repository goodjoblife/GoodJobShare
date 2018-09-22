import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { errorHandlingMiddleware } from './middlewares';
import rootReducer from '../reducers';

const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(errorHandlingMiddleware, thunk, routerMiddleware(history))
  );

export default configureStore;
