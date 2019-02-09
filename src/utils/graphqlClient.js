import { map, prop, compose, join } from 'ramda';
import fetchUtil from './fetchUtil';

const fetch = fetchUtil('/graphql');

const mapErrorMessages = compose(
  join(', '),
  map(prop('message')),
);

const graphqlClient = ({ variables, query, options, token }) =>
  fetch.post({ body: { query, variables }, token, options }).then(response => {
    if (response.errors) {
      return Promise.reject(
        `Graphql Server Errors: ${mapErrorMessages(response.errors)}`,
      );
    }
    return response.data;
  });

export default graphqlClient;
