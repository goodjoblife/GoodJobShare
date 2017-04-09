const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');


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
