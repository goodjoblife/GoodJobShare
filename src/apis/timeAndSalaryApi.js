import fetchUtil from 'utils/fetchUtil';
import qs from 'qs';

const endpoint = '/workings';

export const fetchCompanyCandidates = key =>
  fetchUtil(`${endpoint}/companies/search?${qs.stringify({ key })}`)('GET');

export const fetchJobTitleCandidates = key =>
  fetchUtil(`${endpoint}/jobs/search?${qs.stringify({ key })}`)('GET');

export const fetchTimeAndSalary = opt =>
  fetchUtil(`${endpoint}?${qs.stringify(opt)}`)('GET');

export const fetchTimeAndSalaryExtreme = opt =>
  fetchUtil(`${endpoint}/extreme?${qs.stringify(opt)}`)('GET');

export const fetchCampaignTimeAndSalary = (campaignName, opt) =>
  fetchUtil(`${endpoint}/campaigns/${campaignName}?${qs.stringify(opt)}`)(
    'GET',
  );

export const fetchSearchCompany = opt =>
  fetchUtil(
    `${endpoint}/search_by/company/group_by/company?${qs.stringify(opt)}`,
  )('GET');

export const fetchSearchJobTitle = opt =>
  fetchUtil(
    `${endpoint}/search_by/job_title/group_by/company?${qs.stringify(opt)}`,
  )('GET');

export const postWorkings = body => fetchUtil(endpoint)('post', body);
