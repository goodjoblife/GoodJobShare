import R from 'ramda';

import {
  getCompanyInterviewExperiencesQuery,
  getCompanyTimeAndSalaryQuery,
  getCompanyTimeAndSalaryStatisticsQuery,
} from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

export const getCompanyTimeAndSalary = ({
  companyName,
  jobTitle,
  start,
  limit,
  dataTimeRange,
  experienceInYearRange,
  gender,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryQuery,
    variables: {
      companyName,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    },
  }).then(R.prop('company'));

export const getCompanyTimeAndSalaryStatistics = ({ companyName }) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryStatisticsQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyInterviewExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));
