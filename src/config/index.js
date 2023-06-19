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
  GOOGLE_AD_CLIENT_ID:
    process.env.GOOGLE_AD_CLIENT_ID || 'ca-pub-1493014011538331',
  GOOGLE_AD_MANAGER_NETWORK_ID:
    process.env.GoogleAdManagerNetworkId || '21909228710',
  PIXEL_ID: process.env.RAZZLE_PIXEL_ID || '603414113402034',
  AMPLITUDE_API_KEY:
    process.env.RAZZLE_AMPLITUDE_API_KEY || '22a596db91e9000a6d19ed6a29865cbd',
  PERSIST_KEY: process.env.PERSIST_KEY || 'goodjob',
};
