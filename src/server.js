import Express from 'express';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from './store/configureStore';
import Html from './helpers/Html';
import Root from './components/Root';
import rootRoutes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

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

const server = Express();
server
  .disable('x-powered-by')
  .use(Express.static(process.env.RAZZLE_PUBLIC_DIR));

const wrap = fn => (req, res, next) => fn(req, res).catch(err => next(err));
server.get(
  '/*',
  wrap(async (req, res) => {
    const history = createHistory({ initialEntries: [req.originalUrl] });
    const location = history.location;
    const store = configureStore({ routing: { location } }, history);

    const context = {};

    const { match, route: matchRoute } = matchRoutes(
      location.pathname,
      rootRoutes,
    );

    function resolveComponent() {
      const component = matchRoute.component;
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
    const finalComponent = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Root />
        </StaticRouter>
      </Provider>
    );

    const html = ReactDOMServer.renderToString(
      <Html assets={assets} component={finalComponent} store={store} />,
    );

    if (context.url) {
      if (context.status === 301) {
        res.redirect(301, context.url);
        return;
      }
      res.redirect(context.url);
      return;
    }

    if (context.status) {
      res.status(context.status);
    }

    // TODO handle 301/302

    res.send(`<!doctype html>\n${html}`);
  }),
);

export default server;
