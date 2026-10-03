import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { createThunkExtraArgument } from './thunkExtraArgument';

const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk.withExtraArgument(createThunkExtraArgument(history))),
  );

export default configureStore;
