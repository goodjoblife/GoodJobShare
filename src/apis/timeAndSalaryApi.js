import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import {
  getSearchCompanyQuery,
  getSearchJobTitleQuery,
  changeSalaryWorkTimeStatusGql,
} from 'graphql/timeAndSalary';

const endpoint = '/workings';

export const fetchSearchCompany = ({ companyName, hasData, limit }) =>
  graphqlClient({
    query: getSearchCompanyQuery,
    variables: { companyName, hasData, limit },
  }).then(data => data.search_companies);

export const fetchSearchJobTitle = ({ jobTitle }) =>
  graphqlClient({
    query: getSearchJobTitleQuery,
    variables: { jobTitle },
  }).then(data => data.search_job_titles);

export const postWorkings = ({ body, token }) =>
  fetchUtil(endpoint).post({ body, token });

export const changeSalaryWorkTimeStatus = ({ id, status, token }) =>
  graphqlClient({
    query: changeSalaryWorkTimeStatusGql,
    variables: { input: { id, status } },
    token,
  });
