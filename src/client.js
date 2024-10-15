import React from 'react';
import { hydrate } from 'react-dom';
import { createBrowserHistory as createHistory } from 'history';
import R from 'ramda';
import qs from 'qs';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Root from './components/Root';
import configureStore from './store/configureStore';

function shouldUpdateScroll(prevProps, props) {
  const mapSearch = ({ search, ...rest }) => {
    let s = qs.parse(search, { ignoreQueryPrefix: true });
    s = R.omit(['q'], s); // We don't reset scroll on search query change
    return { search: s, ...rest };
  };
  const getSignature = R.compose(
    mapSearch,
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

  const preloadedState = {
    ...window.__data,
  };
  // delete window.__data;
  return preloadedState;
}

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
