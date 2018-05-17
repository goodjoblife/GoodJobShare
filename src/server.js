import Express from 'express';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from './store/configureStore';
import Html from './helpers/Html';
import App from './components/Layout';
import rootRoutes from './routes';


const matchRoutes = (pathname, routes) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const route of routes) {
    const match = matchPath(pathname, route);
    if (match) {
      if (route.routes) {
        return matchRoutes(pathname, route.routes);
      }
      return { route, match };
    }
  }
  return null;
};


export default (app, webpackIsomorphicTools) => {
  app.use(Express.static(path.join(__dirname, '..', 'dist'), { index: false })); // eslint-disable-line max-len

  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      webpackIsomorphicTools.refresh();
      next();
    });
  }

  const wrap = fn => (req, res, next) => fn(req, res).catch(err => next(err));

  app.use(wrap(async (req, res) => {
    const history = createHistory({ initialEntries: [req.originalUrl] });
    const location = history.location;
    const store = configureStore({ routing: { location } }, history);

    const context = {};

    const { match, route: matchRoute } = matchRoutes(req.path, rootRoutes);

    function resolveComponent() {
      const component = matchRoute.component;
      if (component && component.WrappedComponent) {
        return component.WrappedComponent;
      }
      return component;
    }

    const component = resolveComponent();
    if (component && component.fetchData) {
      // match: 來自 withRouter 或 Route
      // location: 來自 withRouter 或 Route
      // history: 來自 withRouter 或 Route
      // see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
      // store: 提供 fetchData 可以 dispath action
      await component.fetchData({ match, location, history, store });
    }

    /*
    做兩件事：
    1. 準備 Component (很像 Root.js 做的事)
    2. 準備 Template (Html Component)
    */
    const assets = webpackIsomorphicTools.assets();
    const finalComponent = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const html = ReactDOMServer.renderToString(
      <Html assets={assets} component={finalComponent} store={store} />
    );

    if (context.status) {
      res.status(context.status);
    }

    res.send(`<!doctype html>\n${html}`);
  }));

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(req.ip, req.ips);
    console.log(err);
    res.status(500);
    res.send('Internal Server Error');
  });
};
