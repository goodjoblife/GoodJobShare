export const sendEvent = actionName => {
  if (typeof window !== 'undefined' && typeof window.hj !== 'undefined') {
    window.hj('event', actionName);
  }
};
