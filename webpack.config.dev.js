const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackIsomorphicToolsPlugin =
  require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicTools = require('./webpack-isomorphic-tools');

const config = require('./webpack.config.base');

module.exports = merge.smart(config, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    // The debug mode for loaders will be removed in webpack 3 or later. https://webpack.js.org/guides/migrating/#debug
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools).development(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'eslint-loader',
      },
      {
        test: /^((?!\.module).)*\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
        ],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
});
