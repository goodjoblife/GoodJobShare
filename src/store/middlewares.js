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
      console.error(error);
      throw error;
    });
  }
  return result;
};
