const path = require('path');

module.exports = {
  modify: (config, { target, dev }) => {
    config.resolve.alias = {
      common: path.resolve('./src/components/common'),
      utils: path.resolve('./src/utils'),
    };

    for (const rule of config.module.rules) {
      if ((rule.test instanceof RegExp) && rule.test.source === /\.module\.css$/.source) {
        for (const u of rule.use) {
          if (u.loader && u.loader.indexOf('postcss-loader') !== -1) {
            const p = u.options.plugins();
            u.options.plugins = () => ([
              require('autoprefixer')({
                browsers: ['last 2 version', 'ie >= 10'],
              }),
              require('postcss-mixins')(),
              require('postcss-simple-vars')(),
              require('postcss-nested')(),
            ]);
          }
        }
      }
    }
    return config;
  },
};
