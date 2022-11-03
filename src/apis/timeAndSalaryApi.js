import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import {
  getSalaryWorkTimes,
  getSalaryWorkTimeCount,
  getSearchCompanyQuery,
  getCompanyQuery,
  getJobTitleQuery,
  getSearchJobTitleQuery,
  changeSalaryWorkTimeStatus,
} from 'graphql/timeAndSalary';

const endpoint = '/workings';

export const fetchCompanyCandidates = ({ key }) =>
  fetchUtil(`${endpoint}/companies/search`)
    .get({
      query: { key },
    })
    .then(items => items.map(item => item._id.name));

export const fetchJobTitleCandidates = ({ key }) =>
  fetchUtil(`${endpoint}/jobs/search`)
    .get({
      query: { key },
    })
    .then(items => items.map(item => item._id));

export const fetchTimeAndSalary = ({ start, limit }) =>
  graphqlClient({
    query: getSalaryWorkTimes,
    variables: { start, limit },
  });

export const fetchTimeAndSalaryCount = () =>
  graphqlClient({
    query: getSalaryWorkTimeCount,
  }).then(data => data.salary_work_time_count);

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

export const fetchCompany = ({ companyName }) =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(data => data.company);

export const fetchSearchJobTitle = ({ jobTitle }) =>
  graphqlClient({
    query: getSearchJobTitleQuery,
    variables: { jobTitle },
  }).then(data => data.search_job_titles);

export const fetchJobTitle = ({ jobTitle }) =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(data => data.job_title);

export const postWorkings = ({ body, token }) =>
  fetchUtil(endpoint).post({ body, token });

const patchWorking = ({ id, status, token }) =>
  graphqlClient({
    query: changeSalaryWorkTimeStatus,
    variables: { input: { id, status } },
    token,
  });

export default {
  fetchCompanyCandidates,
  fetchJobTitleCandidates,
  fetchTimeAndSalary,
  fetchTimeAndSalaryCount,
  fetchTimeAndSalaryExtreme,
  fetchCampaignTimeAndSalary,
  fetchSearchCompany,
  fetchSearchJobTitle,
  fetchCompany,
  fetchJobTitle,
  postWorkings,
  patchWorking,
};
