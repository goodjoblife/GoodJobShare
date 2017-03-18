const path = require('path');
const express = require('express');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const favicon = require('serve-favicon');

const config = require('./webpack.config.dev');

const port = process.env.PORT || 3001;

const app = express();
const compiler = webpack(config);

compiler.apply(new DashboardPlugin());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(
  favicon(path.join(__dirname, 'src', 'components', 'images', 'favicon.ico'))
);

app.get('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');

  compiler.outputFileSystem.readFile(filename, (err, result) => { // eslint-disable-line consistent-return
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
  });
});

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);  //eslint-disable-line
    return;
  }

  console.log(`Listening at http://localhost:${port}`); //eslint-disable-line
});
