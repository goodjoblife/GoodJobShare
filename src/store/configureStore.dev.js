/* eslint-disable global-require */
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const composeEnhancers =
  (global.window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = (preloadedState, history) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ history }), logger),
    ),
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
