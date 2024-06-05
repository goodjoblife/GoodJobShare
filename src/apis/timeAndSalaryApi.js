import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import {
  getSalaryWorkTimes,
  getSearchCompanyQuery,
  getCompanyQuery,
  getJobTitleQuery,
  getSearchJobTitleQuery,
  changeSalaryWorkTimeStatus,
} from 'graphql/timeAndSalary';

const endpoint = '/workings';

export const fetchTimeAndSalary = ({ start, limit }) =>
  graphqlClient({
    query: getSalaryWorkTimes,
    variables: { start, limit },
  });

export const fetchTimeAndSalaryExtreme = ({ opt }) =>
  fetchUtil(`${endpoint}/extreme`).get({ query: opt });

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

export const patchWorking = ({ id, status, token }) =>
  graphqlClient({
    query: changeSalaryWorkTimeStatus,
    variables: { input: { id, status } },
    token,
  });
