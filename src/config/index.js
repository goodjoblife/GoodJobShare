/**
 * Default environment for development
 */
module.exports = {
  API_HOST: process.env.RAZZLE_API_HOST || 'https://api-dev.goodjob.life',
  FACEBOOK_APP_ID: process.env.RAZZLE_FACEBOOK_APP_ID || '1844389232511081',
  GA_MEASUREMENT_ID: process.env.RAZZLE_GA_MEASUREMENT_ID || 'G-QDG81J6ESN',
  GOOGLE_APP_ID:
    process.env.RAZZLE_GOOGLE_APP_ID ||
    '879657963776-d8j1hq8dk38alp456ncvnq6mqh4f6bua.apps.googleusercontent.com',
  GTM_ID: process.env.RAZZLE_GTM_ID || 'GTM-K2MRXLG',
  PERSIST_KEY: process.env.PERSIST_KEY || 'goodjob',
  ENVIRONMENT: process.env.RAZZLE_ENVIRONMENT || 'localhost',
  // All environment share same rollbar access token
  ROLLBAR_ACCESS_TOKEN: '620cc11dfc5d46bfa4e8430ac62bb954',
  TAP_PAY_APP_ID: process.env.RAZZLE_TAP_PAY_APP_ID || '125271',
  TAP_PAY_APP_KEY:
    process.env.RAZZLE_TAP_PAY_APP_KEY ||
    'app_WBWcR9mkiSMUQ3qZV5tUidkq7vfamUzmdWi5QR33ksT6ttbiZ9BJxbz5Fvma',
  TAP_PAY_SERVER_TYPE: process.env.RAZZLE_TAP_PAY_SERVER_TYPE || 'sandbox',
  ORIGIN: process.env.RAZZLE_ORIGIN || 'http://localhost:3000',
};
