const webpack = require('webpack');

const {
  API_HOST,
  CONTENTFUL_API_HOST,
  FACEBOOK_APP_ID,
  GA_ID,
} = require('./src/config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loaders: ['url-loader?limit=20000'],
      },
      {
        test: /\.svg$/,
        use: [
          'svg-react-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(API_HOST),
        CONTENTFUL_API_HOST: JSON.stringify(CONTENTFUL_API_HOST),
        FACEBOOK_APP_ID: JSON.stringify(FACEBOOK_APP_ID),
        GA_ID: JSON.stringify(GA_ID),
      },
      __SERVER__: false,
    }),
  ],
  resolve: {
    alias: {
      common: `${__dirname}/src/components/common`,
      utils: `${__dirname}/src/utils`,
    },
  },
};
