import fetchUtil from 'utils/fetchUtil';
import qs from 'qs';

const endpoint = '/jobs/search';

export const getJobTitlesSearch = ({ key }) =>
  fetchUtil(`${endpoint}?${qs.stringify({ key })}`).get();

export default {
  getJobTitlesSearch,
};
