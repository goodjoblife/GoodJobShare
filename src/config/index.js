/**
 * Default environment for development
 */
module.exports = {
  API_HOST: process.env.RAZZLE_API_HOST || 'https://api-dev.goodjob.life',
  FACEBOOK_APP_ID: process.env.RAZZLE_FACEBOOK_APP_ID || '1844389232511081',
  GA_ID: process.env.RAZZLE_GA_ID || 'UA-79990667-7',
  GOOGLE_APP_ID:
    process.env.RAZZLE_GOOGLE_APP_ID ||
    '879657963776-d8j1hq8dk38alp456ncvnq6mqh4f6bua.apps.googleusercontent.com',
  GTM_ID: process.env.RAZZLE_GTM_ID || 'GTM-K2MRXLG',
  PIXEL_ID: process.env.RAZZLE_PIXEL_ID || '603414113402034',
  AMPLITUDE_API_KEY:
    process.env.RAZZLE_AMPLITUDE_API_KEY || '22a596db91e9000a6d19ed6a29865cbd',
  SENTRY_DSN: process.env.RAZZLE_SENTRY_DSN,
  GIT_SHA1: process.env.RAZZLE_GIT_SHA1,
  PERSIST_KEY: process.env.PERSIST_KEY || 'goodjob',
  TAP_PAY_APP_ID: process.env.RAZZLE_TAP_PAY_APP_ID || '125271',
  TAP_PAY_APP_KEY:
    process.env.RAZZLE_TAP_PAY_APP_KEY ||
    'app_WBWcR9mkiSMUQ3qZV5tUidkq7vfamUzmdWi5QR33ksT6ttbiZ9BJxbz5Fvma',
  TAP_PAY_SERVER_TYPE: process.env.RAZZLE_TAP_PAY_SERVER_TYPE || 'sandbox',
};
