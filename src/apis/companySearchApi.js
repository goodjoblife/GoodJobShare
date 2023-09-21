import fetchUtil from 'utils/fetchUtil';

const endpoint = '/companies/search';

export const getCompaniesSearch = ({ key }) =>
  fetchUtil(endpoint).get({ query: { key } });
