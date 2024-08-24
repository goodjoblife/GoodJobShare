import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleQuery,
  getJobTitleTimeAndSalaryQuery,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';

export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const getJobTitleTimeAndSalary = ({
  jobTitle,
  companyName,
  start,
  limit,
}) =>
  graphqlClient({
    query: getJobTitleTimeAndSalaryQuery,
    variables: { jobTitle, companyName, start, limit },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
