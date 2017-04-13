const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackIsomorphicToolsPlugin =
  require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicTools = require('./webpack-isomorphic-tools');

const config = require('./webpack.config.base');

module.exports = merge.smart(config, {
  debug: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        CONTENTFUL_TOKEN: JSON.stringify('ef08dee7812e4bbd8c9856776426ade160ea263c2972d19b381b29aae95e4c61'),
      },
    }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools).development(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loaders: ['eslint-loader'],
      },
    ],
    loaders: [
      {
        test: /^((?!\.module).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
        ],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.module\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
});
