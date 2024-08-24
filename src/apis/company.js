import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getCompanyInterviewExperiencesQuery,
  getCompanyQuery,
  queryCompaniesHavingDataGql,
} from 'graphql/company';

export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
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

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });
