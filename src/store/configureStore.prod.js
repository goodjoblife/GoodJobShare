import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { errorHandlingMiddleware } from './middlewares';
import rootReducer from '../reducers';
import api from '../apis';

const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      errorHandlingMiddleware,
      thunk.withExtraArgument({ api, history }),
    ),
  );

export default configureStore;
