const path = require('path');

module.exports = config => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    // remember to update
    // .eslintrc.js
    // jsconfig.json
    // package.json
    // .flowconfig
    common: path.resolve('./src/components/common'),
    utils: path.resolve('./src/utils'),
    graphql: path.resolve('./src/graphql'),
    hooks: path.resolve('./src/hooks'),
    contexts: path.resolve('./src/contexts'),
    constants: path.resolve('./src/constants'),
    apis: path.resolve('./src/apis'),
    actions: path.resolve('./src/actions'),
    selectors: path.resolve('./src/selectors'),
  };
  return config;
};
