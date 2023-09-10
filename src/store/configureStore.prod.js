import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../apis';

const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument({ api, history })),
  );

export default configureStore;
