import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import {
  getSearchCompanyQuery,
  getSearchJobTitleQuery,
} from 'graphql/timeAndSalarySearch';

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

export const fetchSearchCompany = ({ companyName }) =>
  graphqlClient({
    query: getSearchCompanyQuery,
    variables: { companyName },
  }).then(data => data.search_companies);

export const fetchSearchJobTitle = ({ jobTitle }) =>
  graphqlClient({
    query: getSearchJobTitleQuery,
    variables: { jobTitle },
  }).then(data => data.search_job_titles);

export const postWorkings = ({ body, token }) =>
  fetchUtil(endpoint).post({ body, token });

const patchWorking = ({ id, status, token }) =>
  fetchUtil(`/workings/${id}`).patch({
    body: {
      status,
    },
    token,
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
