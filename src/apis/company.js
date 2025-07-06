import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getCompanyTimeAndSalaryQuery,
  getCompanyInterviewExperiencesQuery,
  getCompanyWorkExperiencesQuery,
  queryCompaniesHavingDataGql,
  getCompanyTimeAndSalaryStatisticsQuery,
  getCompanyTopNJobTitlesQuery,
  getCompanyEsgSalaryDataQuery,
  queryCompanyIsSubscribedGql,
  subscribeCompanyGql,
  unsubscribeCompanyGql,
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

export const getCompanyEsgSalaryData = ({ companyName }) =>
  graphqlClient({
    query: getCompanyEsgSalaryDataQuery,
    variables: { companyName },
  }).then(R.path(['company', 'esgSalaryData']));

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

export const queryCompanyIsSubscribedApi = async ({ companyName, token }) => {
  const data = await graphqlClient({
    query: queryCompanyIsSubscribedGql,
    token,
    variables: { companyName },
  });

  if (!data.company) {
    return {
      isSubscribed: false,
      companyId: null,
    };
  }

  return {
    isSubscribed: data.company.isSubscribed,
    companyId: data.company.id,
  };
};

export const subscribeCompanyApi = async ({ companyId, token }) => {
  const data = await graphqlClient({
    query: subscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.subscribeCompany.success;
};

export const unsubscribeCompanyApi = async ({ companyId, token }) => {
  const data = await graphqlClient({
    query: unsubscribeCompanyGql,
    token,
    variables: { input: { companyId } },
  });

  return data.unsubscribeCompany.success;
};
