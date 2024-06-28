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
          use: ['graphql-tag/loader', 'minify-graphql-loader'],
        },
        ...webpackConfig.module.rules,
      ];

      return webpackConfig;
    },
  },
  options: {},
};
