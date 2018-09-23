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
      // this is the default handler for each promise in redux thunk
      if (error.errorCode) {
        // if there exist errorCode, this is an expected error
      } else if (typeof window !== 'undefined' && window.Raven) {
        // otherwise, it's unexpected, send to sentry
        window.Raven.captureException(error, {
          extra: {
            state: getState(), // dump application state
            errorCode: error.errorCode,
            ...error.extra,
          },
        });
      }
      throw error;
    });
  }
  return result;
};
