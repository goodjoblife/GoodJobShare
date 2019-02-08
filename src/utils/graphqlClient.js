import fetchUtil from './fetchUtil';
import { GRAPHQL_ENDPOINT } from '../config';

const fetch = fetchUtil(GRAPHQL_ENDPOINT);

const graphqlClient = ({ variables, query, options, token }) =>
  fetch.post({ body: { query, variables }, token, options });

export default graphqlClient;
