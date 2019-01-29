import R from 'ramda';
import qs from 'qs';

export const pathSelector = R.path(['match', 'path']);
export const paramsSelector = R.path(['match', 'params']);

export const pathnameSelector = R.path(['location', 'pathname']);
export const searchSelector = R.path(['location', 'search']);

// parse search string to object
const locationSearchToQuery = R.compose(
  qs.parse,
  search => {
    if (search[0] === '?') {
      return R.tail(search);
    }
    return search;
  },
);

// props --> query object
export const querySelector = R.compose(
  locationSearchToQuery,
  searchSelector,
);
