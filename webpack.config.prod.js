const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin =
  require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicTools = require('./webpack-isomorphic-tools');

const config = require('./webpack.config.base');

module.exports = merge.smart(config, {
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        CONTENTFUL_TOKEN: JSON.stringify(process.env.CONTENTFUL_TOKEN),
        CONTENTFUL_LABOR_RIGHTS_SPACE: JSON.stringify(process.env.CONTENTFUL_LABOR_RIGHTS_SPACE),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('style-[contenthash].css', { allChunks: true }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools),
  ],
  module: {
    loaders: [
      {
        test: /^((?!\.module).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' // eslint-disable-line max-len
        ),
        exclude: /node_modules/,
      },
    ],
  },
});
