#!/usr/bin/node
require('babel-register')({
  babelrc: false,
  presets: [
    ["env", { targets: {node: "9"}, useBuiltIns: true }],
    "react",
    "stage-2",
  ],
});

const path = require('path');
const project_base_path = path.resolve(__dirname, '..');

function registerWebpackDevServer(app) {
  const webpack = require('webpack');
  const config = require('../webpack.config.dev');
  const compiler = webpack(config);
  const DashboardPlugin = require('webpack-dashboard/plugin');

  compiler.apply(new DashboardPlugin());
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  registerWebpackDevServer(app)
}

global.__SERVER__ = true;

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools'));
webpackIsomorphicTools.server(project_base_path)
  .then(() => {
    require('../src/server').default(app, webpackIsomorphicTools);
  })
  .then(() => {
    const port = process.env.PORT || 3001;

    app.listen(port, err => {
      if (err) {
        console.log(err);  //eslint-disable-line
        return;
      }

      console.log(`Listening at http://localhost:${port}`); //eslint-disable-line
    });
  });
