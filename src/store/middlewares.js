const isPromise = obj => {
  return typeof obj !== 'undefined' && obj.then;
};

export const errorHandlingMiddleware = ({
  dispatch,
  getState,
}) => next => action => {
  const result = next(action);
  // if it's a promise.
  if (isPromise(result)) {
    return result.catch(error => {
      // it's unexpected, send to sentry
      console.error('errorHandlingMiddleware', error);
      if (typeof window !== 'undefined' && window.Raven) {
        window.Raven.captureException(error, {
          extra: {
            state: getState(), // dump application state
          },
        });
      }
      throw error;
    });
  }
  return result;
};
