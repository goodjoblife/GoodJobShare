const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const mixin = require('postcss-mixins');
const simpleVars = require('postcss-simple-vars');
const webpack = require('webpack');

const {
  API_HOST,
  CONTENTFUL_API_HOST,
  FACEBOOK_APP_ID,
} = require('./src/config');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loaders: ['url-loader?limit=20000'],
      },
      {
        test: /\.svg$/,
        loader: 'babel!svg-react',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(API_HOST),
        CONTENTFUL_API_HOST: JSON.stringify(CONTENTFUL_API_HOST),
        FACEBOOK_APP_ID: JSON.stringify(FACEBOOK_APP_ID),
      },
    }),
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'ie >= 10'],
    }),
    mixin,
    simpleVars,
    nested,
  ],
  resolve: {
    alias: {
      common: `${__dirname}/src/components/common`,
      utils: `${__dirname}/src/utils`,
    },
  },
};
