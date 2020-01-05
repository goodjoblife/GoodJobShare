import R from 'ramda';

const mapErrorMessages = R.compose(
  R.join(', '),
  R.map(R.prop('message')),
);

const mapErrorCodes = R.map(R.path(['extensions', 'code']));
const mapErrorPaths = R.map(R.prop('path'));

class GraphqlError extends Error {
  constructor(errors) {
    const message = `GraphqlError: ${mapErrorMessages(errors)}`;
    super(message);

    this.name = 'GraphqlError';
    this.codes = mapErrorCodes(errors);
    this.paths = mapErrorPaths(errors);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphqlError);
    }
  }
}

export default GraphqlError;
export const isGraphqlError = R.propEq('name', 'GraphqlError');
