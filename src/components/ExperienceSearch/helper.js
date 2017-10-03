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

const toQueryPath = ['location', 'query'];
const qsSelector = key => R.path([
  ...toQueryPath,
  key,
]);

export const searchQuerySelector = qsSelector('q');
export const searchBySelector = qsSelector('s_type');
export const pageSelector = qsSelector('p');
export const typeSelector = qsSelector('type');

