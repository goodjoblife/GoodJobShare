import config from '../config';
import * as Sentry from '@sentry/react';

function isEnabled() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
}

function initSentry() {
  if (isEnabled()) {
    if (config.SENTRY_DSN) {
      Sentry.init({
        dsn: config.SENTRY_DSN,
        release: config.GIT_SHA1,
        environment: config.SENTRY_ENVIRONMENT,
      });
      Sentry.captureException(new Error('for test'));
    }
  }
}

export default initSentry;
