/**
 * Default environment for development
 */
module.exports = {
  API_HOST: process.env.RAZZLE_API_HOST || 'https://api-dev.goodjob.life',
  CONTENTFUL_API_HOST:
    process.env.RAZZLE_CONTENTFUL_API_HOST ||
    'https://content-stage.goodjob.life',
  FACEBOOK_APP_ID: process.env.RAZZLE_FACEBOOK_APP_ID || '1750608541889151',
  GA_ID: process.env.RAZZLE_GA_ID || 'UA-79990667-2',
  GTM_ID: process.env.RAZZLE_GTM_ID || 'GTM-K2MRXLG',
  PIXEL_ID: process.env.RAZZLE_PIXEL_ID || '603414113402034',
  SENTRY_DSN: process.env.RAZZLE_SENTRY_DSN,
  GIT_SHA1: process.env.RAZZLE_GIT_SHA1,
  PERSIST_KEY: process.env.PERSIST_KEY || 'goodjob',
};
