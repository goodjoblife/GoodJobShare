type GraphqlErrorItem = {
  message: string;
  path?: (string | number)[];
  extensions?: {
    code?: string;
  };
};

class GraphqlError extends Error {
  codes: (string | undefined)[];
  paths: ((string | number)[] | undefined)[];

  constructor(errors: GraphqlErrorItem[]) {
    super(errors.map(({ message }) => message).join(', '));

    this.name = 'GraphqlError';
    this.codes = errors.map(({ extensions }) => extensions && extensions.code);
    this.paths = errors.map(({ path }) => path);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphqlError);
    }
  }
}

export default GraphqlError;

// Compares `name` instead of using `instanceof`: the build targets es5, where
// subclassing Error breaks the prototype chain and `instanceof` is unreliable.
export const isGraphqlError = (error: unknown): error is GraphqlError =>
  error instanceof Object && (error as Error).name === 'GraphqlError';
