import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';

import Root from './containers/Root';
import createRoutes from './routes';
import configureStore from './store/configureStore';

const preloadedState = {};
// TODO
Object.keys(window.__data).forEach(key => {
  if (key === 'routing') {
    preloadedState[key] = window.__data[key];
  } else {
    preloadedState[key] = fromJS(window.__data[key]);
  }
});
delete window.__data;

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const routes = createRoutes();

let app;

if (module.hot) {
  const { AppContainer } = require('react-hot-loader'); // eslint-disable-line global-require
  app = (
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  );

  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require

    const { pathname, search, hash } = window.location; // eslint-disable-line
    const location = `${pathname}${search}${hash}`; // eslint-disable-line

    match({ location, routes }, () => {
      render(
        <AppContainer>
          <NewRoot store={store} history={history} />
        </AppContainer>,
        rootElement
      );
    });
  });
} else {
  app = <Root store={store} history={history} />;
}

match({ location, routes }, () => {
  render(app, rootElement);
});
