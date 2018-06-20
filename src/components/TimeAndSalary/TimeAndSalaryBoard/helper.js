import R from 'ramda';
import qs from 'qs';

import {
  renameKeys,
} from 'utils/objectUtil';

const renameObject = renameKeys({
  page: 'p',
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

export const pageSelector = qsSelector('p', 1);

export const querySelector = query => ({
  get page() {
    return parseInt(pageSelector(query), 10);
  },
});

export const locationSearchToQuery = R.compose(
  qs.parse,
  search => {
    if (search[0] === '?') {
      return R.tail(search);
    }
    return search;
  }
);
