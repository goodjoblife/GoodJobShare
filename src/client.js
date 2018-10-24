import React from 'react';
import { hydrate } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { ScrollContext } from 'react-router-scroll-4';
import Root from './components/Root';
import configureStore from './store/configureStore';
import initSentry from './utils/sentryUtil';

function parseState(window) {
  if (!window.__data) {
    return {};
  }
  const preloadedState = {};
  Object.keys(window.__data).forEach(key => {
    if (key === 'routing') {
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

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollContext>
        <Root />
      </ScrollContext>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollContext>
            <Root />
          </ScrollContext>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}
