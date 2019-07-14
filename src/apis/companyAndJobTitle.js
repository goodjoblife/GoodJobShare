import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { getCompanyQuery, getJobTitleQuery } from 'graphql/companyAndJobTitle';

export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export default {
  getCompany,
  getJobTitle,
};
