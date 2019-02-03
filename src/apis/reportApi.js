import fetchUtil from 'utils/fetchUtil';
import R from 'ramda';

export const getReports = ({ id }) =>
  fetchUtil(`/experiences/${id}/reports`)
    .get()
    .then(R.prop('reports'));

export default {
  getReports,
};
