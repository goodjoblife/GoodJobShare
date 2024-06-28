import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  queryCompanyGql,
  queryCompaniesHavingDataGql,
} from '../graphql/company';

export const getCompany = companyName =>
  graphqlClient({
    query: queryCompanyGql,
    variables: { companyName },
  }).then(R.prop('company'));

export const queryCompaniesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryCompaniesHavingDataGql,
    variables: { start, limit },
  });
