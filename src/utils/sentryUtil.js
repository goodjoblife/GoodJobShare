import config from '../config';

function initSentry() {
  if (process.env.NODE_ENV === 'production' && config.SENTRY_DSN) {
    if (window.Raven) {
      window.Raven.config(config.SENTRY_DSN).install();
    }
  }
}

export default initSentry;
