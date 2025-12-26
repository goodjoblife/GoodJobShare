import { compose, always, is, ifElse } from 'ramda';

// page from ?rating=xxx
export const ratingsFromQuerySelector = compose(
  ifElse(
    is(String),
    (value: string): number[] =>
      value
        .split(',')
        .map((s: string) => parseInt(s, 10))
        .filter(Number.isFinite),
    always([] as number[]),
  ),
  (query: { rating?: string | undefined }): string | undefined => query.rating,
);
