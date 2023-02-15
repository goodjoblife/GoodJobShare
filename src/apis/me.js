import graphqlClient from 'utils/graphqlClient';

import { getMeQuery, getMyPublishesQuery } from 'graphql/me';

const getMe = ({ token }) =>
  graphqlClient({ query: getMeQuery, token }).then(data => data.me);

const getMyPublishes = ({ token }) =>
  graphqlClient({ query: getMyPublishesQuery, token });

export default {
  getMe,
  getMyPublishes,
};
