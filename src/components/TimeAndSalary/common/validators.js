import { compose, when, always, head, propEq } from 'ramda';
import { searchOptions } from '../SearchBar';

export const validateSearchCriteria = when(
  searchBy => !searchOptions.some(propEq('value', searchBy)),
  always(head(searchOptions).value),
);

export const validateSearchKeyword = when(
  keyword => typeof keyword !== 'string',
  always(''),
);

export const validatePage = compose(
  when(Number.isNaN, always(1)),
  p => parseInt(p, 10),
);
