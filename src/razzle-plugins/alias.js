const path = require('path');

module.exports = config => {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    common: path.resolve('./src/components/common'),
    utils: path.resolve('./src/utils'),
  };
  return config;
};
