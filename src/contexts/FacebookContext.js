import React from 'react';

export const FacebookStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  TIMED_OUT: 'timedOut',
  FAILED: 'failed',
};

export default React.createContext({
  FB: null,
  status: FacebookStatus.IDLE,
  loadFacebook: () => Promise.resolve(null),
  retryFacebook: () => Promise.resolve(null),
});
