import fetchUtil from './fetchUtil';

const fetch = fetchUtil('/graphql');

const graphqlClient = ({ variables, query, options, token }) =>
  fetch
    .post({ body: { query, variables }, token, options })
    .then(response => response.data);

export default graphqlClient;
