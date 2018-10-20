import R from 'ramda';

class HttpError extends Error {
  constructor(message, { statusCode }) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
export const isHttpError = R.propEq('name', 'HttpError');
