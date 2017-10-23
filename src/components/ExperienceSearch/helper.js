import R from 'ramda';
import qs from 'qs';

import {
  renameKeys,
} from 'utils/objectUtil';

const renameObject = renameKeys({
  searchQuery: 'q',
  searchBy: 's_type',
  page: 'p',
});

export const toQsString = R.compose(
  qs.stringify,
  renameObject,
);

const qsSelector = (key, defaultValue) => R.pathOr(defaultValue, [
  key,
]);

export const searchQuerySelector = qsSelector('q', '');
export const searchBySelector = qsSelector('s_type', 'company');
export const sortBySelector = qsSelector('sort', 'created_at');
export const pageSelector = qsSelector('p', 1);
export const typeSelector = qsSelector('type', 'interview,work');

