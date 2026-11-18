/**
 * RAZZLE_* 在 build 時內嵌。沒有預設值：
 * - 本機開發由 .env.development 提供
 * - 部署環境由 .github/docker-compose-*.yml 的 build args 提供
 */
module.exports = {
  API_HOST: process.env.RAZZLE_API_HOST,
  FACEBOOK_APP_ID: process.env.RAZZLE_FACEBOOK_APP_ID,
  GA_MEASUREMENT_ID: process.env.RAZZLE_GA_MEASUREMENT_ID,
  GOOGLE_APP_ID: process.env.RAZZLE_GOOGLE_APP_ID,
  GTM_ID: process.env.RAZZLE_GTM_ID,
  PERSIST_KEY: 'goodjob',
  ENVIRONMENT: process.env.RAZZLE_ENVIRONMENT,
  // All environment share same rollbar access token
  ROLLBAR_ACCESS_TOKEN: '620cc11dfc5d46bfa4e8430ac62bb954',
  TAP_PAY_APP_ID: process.env.RAZZLE_TAP_PAY_APP_ID,
  TAP_PAY_APP_KEY: process.env.RAZZLE_TAP_PAY_APP_KEY,
  TAP_PAY_SERVER_TYPE: process.env.RAZZLE_TAP_PAY_SERVER_TYPE,
  ORIGIN: process.env.RAZZLE_ORIGIN,
};
