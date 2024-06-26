module.exports = {
  object: {
    modifyWebpackConfig: ({ webpackConfig }) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const rule of webpackConfig.module.rules) {
        if (
          rule.test instanceof RegExp &&
          rule.test.source === /\.css$/.source
        ) {
          // eslint-disable-next-line no-restricted-syntax
          for (const u of rule.use) {
            if (u.loader && u.loader.indexOf('postcss-loader') !== -1) {
              u.options.plugins = () => [
                // eslint-disable-next-line global-require
                require('autoprefixer')({
                  browsers: ['last 2 version', 'ie >= 10'],
                }),
                require('postcss-mixins')(), // eslint-disable-line global-require
                require('postcss-simple-vars')(), // eslint-disable-line global-require
                require('postcss-nested')(), // eslint-disable-line global-require
              ];
            }
          }
        }
      }
      return webpackConfig;
    },
    modifyJestConfig: ({ jestConfig }) => {
      jestConfig.transformIgnorePatterns = [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      ];
      return jestConfig;
    },
  },
  options: {},
};
