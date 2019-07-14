import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { getCompanyQuery } from 'graphql/companyAndJobTitle';

export const getCompany = companyName =>
  graphqlClient({
    query: getCompanyQuery,
    variables: { companyName },
  }).then(R.prop('company'));

export default {
  getCompany,
};
