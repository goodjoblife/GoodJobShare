class HttpError extends Error {
  constructor({ message, statusCode, errorCode, ...extra }) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.extra = extra;
    Error.captureStackTrace(this, HttpError);
  }
}
export default HttpError;
