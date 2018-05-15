import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';

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

const preloadedState = parseState(window);

const history = createHistory();
const store = configureStore(preloadedState, history);
const rootElement = document.getElementById('root');

let app;

if (module.hot) {
  const { AppContainer } = require('react-hot-loader'); // eslint-disable-line global-require
  app = (
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  );

  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <NewRoot store={store} history={history} />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
} else {
  app = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  );
}

render(app, rootElement);
