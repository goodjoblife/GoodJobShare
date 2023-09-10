const path = require('path');

module.exports = config => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    // remember to update
    // .eslintrc.js
    // jsconfig.json
    // package.json
    // .flowconfig
    actions: path.resolve('./src/actions'),
    apis: path.resolve('./src/apis'),
    common: path.resolve('./src/components/common'),
    constants: path.resolve('./src/constants'),
    contexts: path.resolve('./src/contexts'),
    graphql: path.resolve('./src/graphql'),
    hooks: path.resolve('./src/hooks'),
    selectors: path.resolve('./src/selectors'),
    utils: path.resolve('./src/utils'),
  };
  return config;
};
