class HttpError extends Error {
  statusCode: number;

  constructor(message: string, { statusCode }: { statusCode: number }) {
    super(message);

    this.name = 'HttpError';
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

export default HttpError;

// See the note in graphqlError.ts on why this compares `name`.
export const isHttpError = (error: unknown): error is HttpError =>
  error instanceof Object && (error as Error).name === 'HttpError';
