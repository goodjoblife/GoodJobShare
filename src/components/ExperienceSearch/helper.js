import R from 'ramda';
import qs from 'qs';

import { renameKeys } from 'utils/objectUtil';

const renameObject = renameKeys({
  searchQuery: 'q',
  searchBy: 's_by',
  page: 'p',
  searchType: 'type',
});

export const toQsString = R.compose(
  qs.stringify,
  renameObject,
  R.evolve({
    searchType: R.join(','),
  }),
);

const wrapDefaultTo = defaultValue => value => {
  if (value === '') {
    return defaultValue;
  }

  return R.defaultTo(defaultValue)(value);
};

const qsSelector = (key, defaultValue) =>
  R.compose(
    wrapDefaultTo(defaultValue),
    R.propOr(defaultValue, key),
  );

export const searchQuerySelector = qsSelector('q', '');
export const searchBySelector = qsSelector('s_by', 'job_title');
export const sortBySelector = qsSelector('sort', 'created_at');
export const sortSelector = qsSelector('sort', 'created_at');
export const pageSelector = R.compose(
  parseInt,
  qsSelector('p', 1),
);
export const searchTypeSelector = R.compose(
  R.split(','),
  qsSelector('type', 'interview,work,intern'),
);

export const queryParser = query => ({
  get sort() {
    return sortSelector(query);
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

export const handleSearchType = searchType =>
  R.compose(
    R.join(','),
    R.ifElse(
      R.contains(searchType),
      R.reject(R.equals(searchType)),
      R.append(searchType),
    ),
  );
