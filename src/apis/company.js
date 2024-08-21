import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getCompanyQuery,
  getCompanyTimeAndSalaryQuery,
  queryCompaniesHavingDataGql,
} from 'graphql/company';

export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyTimeAndSalary = ({ companyName, start, limit }) =>
  graphqlClient({
    query: getCompanyTimeAndSalaryQuery,
    variables: { companyName, start, limit },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });
