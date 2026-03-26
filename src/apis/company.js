import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getCompanyTimeAndSalaryQuery,
  getCompanyInterviewExperiencesQuery,
  getCompanyWorkExperiencesQuery,
  queryCompaniesHavingDataGql,
  getCompanyTimeAndSalaryStatisticsQuery,
  getCompanyTopNJobTitlesQuery,
} from 'graphql/company';

export const getCompanyTimeAndSalary = ({
  companyName,
  jobTitle,
  start,
  limit,
}) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryQuery,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export const getCompanyTimeAndSalaryStatistics = ({ companyName }) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryStatisticsQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyTopNJobTitles = ({ companyName }) =>
  graphqlClient({
    query: getCompanyTopNJobTitlesQuery,
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

export const getCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyWorkExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });
