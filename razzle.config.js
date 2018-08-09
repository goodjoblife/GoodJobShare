const path = require('path');

module.exports = {
  modify: config => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      common: path.resolve('./src/components/common'),
      utils: path.resolve('./src/utils'),
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const rule of config.module.rules) {
      if (
        rule.test instanceof RegExp &&
        rule.test.source === /\.module\.css$/.source
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
    return config;
  },
};
