import { compose, when, always } from 'ramda';

// page from ?p=xxx
export const pageFromQuerySelector = compose(
  when(Number.isNaN, always(1)),
  p => parseInt(p, 10),
  query => query.p,
);
