/* global webpackIsomorphicTools */
import Express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';
import routes from './routes';
import configureStore from './store/configureStore';
import Html from './helpers/Html';


export default (app, webpackIsomorphicTools) => {
  app.use(favicon(path.join(__dirname, 'components', 'images', 'favicon.ico'))); // eslint-disable-line max-len

  app.use(Express.static(path.join(__dirname, '..', 'dist'), { index: false })); // eslint-disable-line max-len

  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      webpackIsomorphicTools.refresh();
      next();
    });
  }

  app.use((req, res, next) => {
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const store = configureStore(undefined, memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    const location = req.originalUrl;

    match({ routes: routes(), location, history }, (err, redirectLocation, renderProps) => { // eslint-disable-line max-len
      if (err) {
        next(err);
        return;
      }

      if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search); // eslint-disable-line max-len
        return;
      }
      if (!renderProps) {
        next(new Error('Missing render props'));
        return;
      }

      function getReduxPromise() {
        const { query, params } = renderProps;

        function resolveComponent() {
          const component = renderProps.components[renderProps.components.length - 1];
          if (component && component.WrappedComponent) {
            return component.WrappedComponent;
          }
          return component;
        }

        const component = resolveComponent();

        if (component && component.fetchData) {
          return component.fetchData({ query, params, store, history });
        }

        return Promise.resolve();
      }

      getReduxPromise().then(() => {
        /*
        做兩件事：
        1. 準備 Component (很像 Root.js 做的事)
        2. 準備 Template (Html Component)
        */
        const assets = webpackIsomorphicTools.assets();
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = ReactDOMServer.renderToString(
          <Html assets={assets} component={component} store={store} />
        );

        res.send(`<!doctype html>\n${html}`);
      });
    });
  });
};
