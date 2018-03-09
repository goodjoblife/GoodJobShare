import R from 'ramda';
import qs from 'qs';

import {
  renameKeys,
} from 'utils/objectUtil';

const renameObject = renameKeys({
  searchQuery: 'q',
  searchBy: 's_by',
  page: 'p',
  searchType: 'type',
});

export const toQsString = R.compose(
  qs.stringify,
  renameObject,
);

const wrapDefaultTo = defaultValue => value => {
  if (value === '') {
    return defaultValue;
  }

  return R.defaultTo(defaultValue)(value);
};

const qsSelector = (key, defaultValue) => R.compose(
  wrapDefaultTo(defaultValue),
  R.propOr(defaultValue, key),
);

export const searchQuerySelector = qsSelector('q', '');
export const searchBySelector = qsSelector('s_by', 'job_title');
export const sortBySelector = qsSelector('sort', 'created_at');
export const pageSelector = qsSelector('p', 1);
export const searchTypeSelector = R.compose(
  qsSelector('type', 'interview,work'),
);

export const querySelector = query => ({
  get sortBy() {
    return sortBySelector(query);
  },
  get searchQuery() {
    return searchQuerySelector(query);
  },
  get searchBy() {
    return searchBySelector(query);
  },
  get page() {
    return pageSelector(query);
  },
  get searchType() {
    return searchTypeSelector(query);
  },
});

export const handleSearchType = searchType => R.compose(
  R.join(','),
  R.ifElse(
    R.contains(searchType),
    R.reject(
      R.equals(searchType),
    ),
    R.append(searchType),
  ),
);

export const locationSearchToQuery = R.compose(
  search => {
    if (search[0] === '?') {
      return R.tail(search);
    }
    return search;
  },
  qs.parse
);
