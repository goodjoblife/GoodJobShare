import R from 'ramda';

import graphqlClient from 'utils/graphqlClient';
import { getCompanyQuery, getCompaniesHavingDataQuery } from 'graphql/company';

export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export const getCompanyNames = () =>
  graphqlClient({ query: getCompaniesHavingDataQuery })
    .then(R.prop('companies_having_data'))
    .then(R.map(R.prop('name')));
