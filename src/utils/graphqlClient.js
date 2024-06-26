import { GraphqlError } from 'utils/errors';
import fetchUtil from './fetchUtil';

const fetch = fetchUtil('/graphql');

const minifyQuery = query =>
  query
    .replace(/\s?([{}()])\s?/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const graphqlClient = ({ variables, query, options, token }) =>
  fetch
    .post({ body: { query: minifyQuery(query), variables }, token, options })
    .then(response => {
      if (response.errors) {
        throw new GraphqlError(response.errors);
      }
      return response.data;
    });

export default graphqlClient;
