import config from '../config';
import * as Sentry from '@sentry/react';

function isEnabled() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
}

function initSentry() {
  if (true || isEnabled()) {
    if (config.SENTRY_DSN) {
      Sentry.init({
        dsn: config.SENTRY_DSN,
        release: config.GIT_SHA1 ? config.GIT_SHA1 : 'none',
        environment: 'localhost',
        /* 
            Disable sending error message by default
            use window.Raven.captureException to mannually
            send error
          */
        enabled: true,
        beforeSend: event => {
          console.log('Sentry send', event);
          return event;
        },
      });
      Sentry.captureException(new Error('for test'));
    }
  }
}

export default initSentry;
