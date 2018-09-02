function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      let promise = action(dispatch, getState, extraArgument);
      if (promise instanceof Promise) {
        promise = promise.catch(error => {
          // this is the default handler for each promise in redux thunk
          if (error.errorCode) {
            // if there exist errorCode, this is an expected error
            console.error('expected error:', error);
          } else if (window.Raven) {
            // otherwise, it's unexpected, send to sentry
            window.Raven.captureException(error, {
              extra: {
                state: getState(), // dump application state
                errorCode: error.errorCode,
                ...error.extra,
              },
            });
          }
        });
        return promise;
      }
    }
    return next(action);
  };
}
export const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
