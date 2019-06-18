import R from 'ramda';

class UiNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UiNotFoundError';
    Error.captureStackTrace(this, UiNotFoundError);
  }
}

export default UiNotFoundError;
export const isUiNotFoundError = R.propEq('name', 'UiNotFoundError');
