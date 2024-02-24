import R from 'ramda';

import fetchUtil from 'utils/fetchUtil';

export const getReports = ({ id }) =>
  fetchUtil(`/experiences/${id}/reports`)
    .get()
    .then(R.prop('reports'));
