function HttpError({ message, statusCode, errorCode, ...extra }) {
  this.name = 'HttpError';
  this.message = message || 'Default Message';
  this.statusCode = statusCode;
  this.errorCode = errorCode;
  this.stack = new Error().stack;
  this.extra = extra;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

export default HttpError;
