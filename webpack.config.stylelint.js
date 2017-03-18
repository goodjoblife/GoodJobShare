const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const nested = require('postcss-nested');
const simpleVars = require('postcss-simple-vars');

const config = require('./webpack.config.base');

delete config.postcss;

module.exports = merge.smart(config, {
  debug: true,

  devtool: 'eval',

  entry: './src/index',

  module: {
    loaders: [
      {
        test: /^((?!\.module).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'sweetalert')
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

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],

  postcss: [
    simpleVars,
    nested,
    stylelint,
    reporter({
      throwError: true,
    }),
  ],
});
