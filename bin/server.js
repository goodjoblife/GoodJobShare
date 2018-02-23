#!/usr/bin/node
require('babel-register')({
  babelrc: false,
  presets: [
    ['env', { targets: { node: '9' }, useBuiltIns: true }],
    'react',
    'stage-2',
  ],
});
const path = require('path');
const express = require('express');

function registerWebpackDevServer(app) {
  // eslint-disable-next-line global-require
  const webpack = require('webpack');
  // eslint-disable-next-line global-require
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  // eslint-disable-next-line global-require
  const DashboardPlugin = require('webpack-dashboard/plugin');

  compiler.apply(new DashboardPlugin());
  // eslint-disable-next-line global-require
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  }));
  // eslint-disable-next-line global-require
  app.use(require('webpack-hot-middleware')(compiler));
}

const app = express();
const projectBasePath = path.resolve(__dirname, '..');

if (process.env.NODE_ENV !== 'production') {
  registerWebpackDevServer(app);
}

global.__SERVER__ = true;

// eslint-disable-next-line global-require
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
// eslint-disable-next-line global-require
const webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'));

async function main() {
  await webpackIsomorphicTools.server(projectBasePath);

  // eslint-disable-next-line global-require
  require('../src/server').default(app, webpackIsomorphicTools);

  const port = process.env.PORT || 3001;

  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`Listening at http://localhost:${port}`);
  });
}

main().catch(err => console.log(err));
