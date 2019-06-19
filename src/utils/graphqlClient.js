import { GraphqlError } from 'utils/errors';
import fetchUtil from './fetchUtil';

const fetch = fetchUtil('/graphql');

const graphqlClient = ({ variables, query, options, token }) =>
  fetch.post({ body: { query, variables }, token, options }).then(response => {
    if (response.errors) {
      throw new GraphqlError(response.errors);
    }
    return response.data;
  });

export default graphqlClient;
