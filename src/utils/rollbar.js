import Rollbar from 'rollbar';

import { ENV, ROLLBAR_ACCESS_TOKEN } from '../config';

const rollbar = new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  captureUncaught: false, // Disable automatic capturing of uncaught errors
  captureUnhandledRejections: false, // Disable automatic capturing of unhandled promise rejections
  environment: ENV,
});

export default rollbar;
