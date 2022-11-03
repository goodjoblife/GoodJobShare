import React from 'react';
import { hydrate } from 'react-dom';
import { createBrowserHistory as createHistory } from 'history';
import R from 'ramda';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import initSentry from 'utils/sentryUtil';
import Root from './components/Root';
import configureStore from './store/configureStore';

function shouldUpdateScroll(prevProps, props) {
  const getSignature = R.compose(
    R.omit(['state', 'key']),
    R.path(['location']),
  );
  const diffSignature = R.unapply(
    R.compose(
      R.not,
      R.apply(R.equals),
      R.map(getSignature),
    ),
  );
  return diffSignature(prevProps, props);
}

function parseState(window) {
  if (!window.__data) {
    return {};
  }

  const shouldNotTransform = R.flip(R.contains)([
    'laborRights',
    'company',
    'jobTitle',
    'popularCompanyAverageSalary',
    'popularJobTitleSalaryDistribution',
  ]);
  const preloadedState = {};
  Object.keys(window.__data).forEach(key => {
    if (shouldNotTransform(key)) {
      preloadedState[key] = window.__data[key];
    } else {
      preloadedState[key] = fromJS(window.__data[key]);
    }
  });
  // delete window.__data;
  return preloadedState;
}

initSentry();

const preloadedState = parseState(window);

const history = createHistory();
const store = configureStore(preloadedState, history);
const persistor = persistStore(store);

hydrate(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <ScrollContext shouldUpdateScroll={shouldUpdateScroll}>
          <Root />
        </ScrollContext>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    hydrate(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <ScrollContext shouldUpdateScroll={shouldUpdateScroll}>
              <Root />
            </ScrollContext>
          </Router>
        </PersistGate>
      </Provider>,
      document.getElementById('root'),
    );
  });
}
