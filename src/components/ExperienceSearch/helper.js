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
  R.prop(key),
);

export const searchQuerySelector = qsSelector('q', '');
export const searchBySelector = qsSelector('s_by', 'job_title');
export const sortBySelector = qsSelector('sort', 'created_at');
export const pageSelector = qsSelector('p', 1);
export const searchTypeSelector = R.compose(
  R.split(','),
  qsSelector('type', 'interview,work'),
);

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
