/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  module.exports = require('./config.prod');
} else {
  module.exports = require('./config.dev');
}
