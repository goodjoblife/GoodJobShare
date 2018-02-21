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
  entry: [
    './src/index',
  ],
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
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      filename: '[name]-[chunkhash].js',
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new ExtractTextPlugin({ filename: 'style-[contenthash].css', allChunks: true }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicTools),
  ],
  module: {
    rules: [
      {
        test: /^((?!\.module).)*\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'style-loader',
            'css-loader',
          ],
        }),
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.module\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
          fallback: 'style-loader',
        }),
        exclude: /node_modules/,
      },
    ],
  },
});
