/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const configureStore = (preloadedState, history) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
