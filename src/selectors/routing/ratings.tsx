import { always, compose, is, when } from 'ramda';

// page from ?rating=xxx
export const ratingFromQuerySelector = compose(
  when(isNaN, always(null)),
  when(is(String), (value: string): number => parseInt(value, 10)),
  (query: { rating?: string | undefined }): string | undefined => query.rating,
);
