#!/usr/bin/node
require('babel-register');

const path = require('path');
const project_base_path = path.resolve(__dirname, '..');

const express = require('express');
const app = express();

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
