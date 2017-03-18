const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
        loader: 'babel!svg-react'
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
  ],

  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'ie >= 10'],
    }),
    nested,
  ],
};
