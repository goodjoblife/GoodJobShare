const path = require('path');

module.exports = {
  object: {
    modifyWebpackOptions({ options: { webpackOptions } }) {
      webpackOptions.fileLoaderExclude = [
        ...webpackOptions.fileLoaderExclude,
        /\.(graphql|gql)$/,
      ];
      return webpackOptions;
    },
    modifyWebpackConfig: ({ webpackConfig }) => {
      webpackConfig.module.rules = [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './graphql-loader.js'),
        },
        ...webpackConfig.module.rules,
      ];

      return webpackConfig;
    },
  },
  options: {},
};
