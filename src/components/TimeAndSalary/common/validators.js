import { compose, when, always } from 'ramda';

export const validateSearchKeyword = when(
  keyword => typeof keyword !== 'string',
  always(''),
);

export const validatePage = compose(
  when(Number.isNaN, always(1)),
  p => parseInt(p, 10),
);
