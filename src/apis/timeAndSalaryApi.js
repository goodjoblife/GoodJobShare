import fetchUtil from 'utils/fetchUtil';

const endpoint = '/workings';

export const fetchCompanyCandidates = ({ key }) =>
  fetchUtil(`${endpoint}/companies/search`).get({
    query: { key },
  });

export const fetchJobTitleCandidates = ({ key }) =>
  fetchUtil(`${endpoint}/jobs/search`).get({
    query: { key },
  });

export const fetchTimeAndSalary = ({ opt }) =>
  fetchUtil(`${endpoint}`).get({ query: opt });

export const fetchTimeAndSalaryExtreme = ({ opt }) =>
  fetchUtil(`${endpoint}/extreme`).get({ query: opt });

export const fetchCampaignTimeAndSalary = ({ campaignName, opt }) =>
  fetchUtil(`${endpoint}/campaigns/${campaignName}`).get({
    query: opt,
  });

export const fetchSearchCompany = ({ opt }) =>
  fetchUtil(`${endpoint}/search_by/company/group_by/company`).get({
    query: opt,
  });

export const fetchSearchJobTitle = ({ opt }) =>
  fetchUtil(`${endpoint}/search_by/job_title/group_by/company`).get({
    query: opt,
  });

export const postWorkings = ({ body }) => fetchUtil(endpoint).post({ body });

const patchWorking = ({ id, status }) =>
  fetchUtil(`/workings/${id}`).patch({
    body: {
      status,
    },
  });

export default {
  fetchCompanyCandidates,
  fetchJobTitleCandidates,
  fetchTimeAndSalary,
  fetchTimeAndSalaryExtreme,
  fetchCampaignTimeAndSalary,
  fetchSearchCompany,
  fetchSearchJobTitle,
  postWorkings,
  patchWorking,
};
