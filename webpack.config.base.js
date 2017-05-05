const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const webpack = require('webpack');

const API_HOST = process.env.API_HOST || 'http://127.0.0.1:12000';
const CONTENTFUL_API_HOST = process.env.CONTENTFUL_API_HOST
  || 'https://content-stage.goodjob.life';

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
      },
    }),
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'ie >= 10'],
    }),
    nested,
  ],
  resolve: {
    alias: {
      common: `${__dirname}/src/components/common`,
      utils: `${__dirname}/src/utils`,
    },
  },
};
