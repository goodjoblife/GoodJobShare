import fetchUtil from 'utils/fetchUtil';
import R from 'ramda';

export const getReports = id =>
  fetchUtil(`/experiences/${id}/reports`)('GET').then(R.prop('reports'));

export const foo = 1;
