import R from 'ramda';
import qs from 'qs';

export const pathSelector = R.path(['match', 'path']);
export const paramsSelector = R.path(['match', 'params']);

export const pathnameSelector = R.path(['location', 'pathname']);
export const searchSelector = R.path(['location', 'search']);

// props --> query object
export const querySelector = R.compose(
  query => qs.parse(query, { ignoreQueryPrefix: true }),
  searchSelector,
);

export const searchKeywordSelector = R.compose(
  params => params.q,
  querySelector,
);

export const searchCriteriaSelector = R.compose(
  params => params.s_by,
  querySelector,
);

export const pageSelector = R.compose(
  params => params.p,
  querySelector,
);
