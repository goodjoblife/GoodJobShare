/* global webpackIsomorphicTools */
import Express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import React from 'react';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import Html from './helpers/Html';


const matchRoutes = ({ routes, location, history }) =>
  (new Promise((resolve, reject) => {
    match({ routes, location, history }, (err, redirectLocation, renderProps) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({ redirectLocation, renderProps });
    });
  }));


export default (app, webpackIsomorphicTools) => {
  app.use(favicon(path.join(__dirname, 'components', 'images', 'favicon.ico'))); // eslint-disable-line max-len

  app.use(Express.static(path.join(__dirname, '..', 'dist'), { index: false })); // eslint-disable-line max-len

  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      webpackIsomorphicTools.refresh();
      next();
    });
  }

  const wrap = fn => (req, res, next) => fn(req, res).catch(err => next(err));

  app.use(wrap(async (req, res) => {
    const memoryHistory = createMemoryHistory(req.originalUrl);
    const store = configureStore(undefined, memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    const location = req.originalUrl;

    const { redirectLocation, renderProps } = await matchRoutes({ routes: createRoutes(), location, history });

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (!renderProps) {
      throw new Error('Missing render props');
    }

    function resolveComponent() {
      const component = renderProps.components[renderProps.components.length - 1];
      if (component && component.WrappedComponent) {
        return component.WrappedComponent;
      }
      return component;
    }

    const component = resolveComponent();
    if (component && component.fetchData) {
      // expect renderProps to have routes, params, location, components
      await component.fetchData({ ...renderProps, store, history });
    }

    /*
    做兩件事：
    1. 準備 Component (很像 Root.js 做的事)
    2. 準備 Template (Html Component)
    */
    const assets = webpackIsomorphicTools.assets();
    const finalComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const html = ReactDOMServer.renderToString(
      <Html assets={assets} component={finalComponent} store={store} />
    );

    res.send(`<!doctype html>\n${html}`);
  }));

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(req.ip, req.ips);
    console.log(err);
    res.status(500);
    res.send('Internal Server Error');
  });
};
