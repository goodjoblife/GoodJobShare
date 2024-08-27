import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getCompanyQuery,
  queryCompanyOverviewGql,
  getCompanyTimeAndSalaryQuery,
  getCompanyInterviewExperiencesQuery,
  getCompanyWorkExperiencesQuery,
  queryCompaniesHavingDataGql,
  getCompanyTimeAndSalaryStatisticsQuery,
} from 'graphql/company';

// TODO: DEPRECATED
export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const queryCompanyOverview = ({
  companyName,
  interviewExperiencesLimit,
  workExperiencesLimit,
  salaryWorkTimesLimit,
}) =>
  graphqlClient({
    query: queryCompanyOverviewGql,
    variables: {
      companyName,
      interviewExperiencesLimit,
      workExperiencesLimit,
      salaryWorkTimesLimit,
    },
  }).then(R.prop('company'));

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

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
}) =>
  graphqlClient({
    query: getCompanyInterviewExperiencesQuery,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export const getCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
}) =>
  graphqlClient({
    query: getCompanyWorkExperiencesQuery,
    variables: { companyName, jobTitle, start, limit },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });
