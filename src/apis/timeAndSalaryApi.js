import fetchUtil from 'utils/fetchUtil';
import qs from 'qs';

const endpoint = '/workings';

export const fetchTimeAndSalary = opt =>
  fetchUtil(`${endpoint}?${qs.stringify(opt)}`)('GET');

export const fetchSearchCompany = opt =>
  fetchUtil(`${endpoint}/search_by/company/group_by/company?${qs.stringify(opt)}`)('GET');

export const fetchSearchJobTitle = opt =>
  fetchUtil(`${endpoint}/search_by/job_title/group_by/company?${qs.stringify(opt)}`)('GET');
