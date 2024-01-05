import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument({ history })),
  );

export default configureStore;
