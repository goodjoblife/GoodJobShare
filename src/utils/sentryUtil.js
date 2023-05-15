import config from '../config';

function isEnabled() {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }
  return false;
}

function initSentry() {
  if (isEnabled()) {
    if (config.SENTRY_DSN) {
      if (typeof window !== 'undefined' && window.Raven) {
        if (config.GIT_SHA1) {
          window.Raven.config(config.SENTRY_DSN, {
            release: config.GIT_SHA1,
            /* 
              Disable sending error message by default
              use window.Raven.captureException to mannually
              send error
            */
            enabled: false,
          }).install();
        } else {
          window.Raven.config(config.SENTRY_DSN, {
            enabled: false,
          }).install();
        }
      }
    }
  }
}

export default initSentry;
