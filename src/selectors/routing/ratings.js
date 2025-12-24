import { compose, always, is, ifElse } from 'ramda';

// page from ?rating=xxx
export const ratingsFromQuerySelector = compose(
  ifElse(
    is(String),
    value =>
      value
        .split(',')
        .map(s => parseInt(s, 10))
        .filter(Number.isFinite),
    always([]),
  ),
  query => query.rating,
);
