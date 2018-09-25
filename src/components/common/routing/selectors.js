import R from 'ramda';

export const pathSelector = R.path(['match', 'path']);
export const paramsSelector = R.path(['match', 'params']);

export const pathnameSelector = R.path(['location', 'pathname']);
export const searchSelector = R.path(['location', 'search']);
