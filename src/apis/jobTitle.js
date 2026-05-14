import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleInterviewExperiencesQuery,
  getJobTitleTimeAndSalaryQuery,
  queryJobTitlesHavingDataGql,
  getJobTitleTimeAndSalaryStatisticsQuery,
} from 'graphql/jobTitle';

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

export const getJobTitleTimeAndSalaryStatistics = ({ jobTitle }) =>
  graphqlClient({
    query: getJobTitleTimeAndSalaryStatisticsQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const getJobTitleInterviewExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getJobTitleInterviewExperiencesQuery,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
