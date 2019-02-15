import fetchUtil from 'utils/fetchUtil';

const endpoint = '/jobs/search';

export const getJobTitlesSearch = ({ key }) =>
  fetchUtil(endpoint).get({ query: { key } });

export default {
  getJobTitlesSearch,
};
