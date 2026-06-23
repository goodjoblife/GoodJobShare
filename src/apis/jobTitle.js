import R from 'ramda';

import {
  getJobTitleInterviewExperiencesQuery,
  getJobTitleTimeAndSalaryQuery,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

export const getJobTitleTimeAndSalary = ({
  jobTitle,
  companyName,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}) =>
  graphqlClient({
    query: getJobTitleTimeAndSalaryQuery,
    variables: {
      jobTitle,
      companyName,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    },
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
