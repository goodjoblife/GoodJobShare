import fetchUtil from 'utils/fetchUtil';
import qs from 'qs';

const endpoint = '/companies/search';

export const getCompaniesSearch = key =>
  fetchUtil(`${endpoint}?${qs.stringify({ key })}`)('get');
export const foo = 1;
