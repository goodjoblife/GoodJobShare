import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import {
  getSearchCompanyQuery,
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

export const patchWorking = ({ id, status, token }) =>
  graphqlClient({
    query: changeSalaryWorkTimeStatus,
    variables: { input: { id, status } },
    token,
  });
