class UiNotFoundError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'UiNotFoundError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UiNotFoundError);
    }
  }
}

export default UiNotFoundError;

// See the note in graphqlError.ts on why this compares `name`.
export const isUiNotFoundError = (error: unknown): error is UiNotFoundError =>
  error instanceof Object && (error as Error).name === 'UiNotFoundError';
