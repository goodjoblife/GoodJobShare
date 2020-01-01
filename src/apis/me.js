import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';

import { getMeQuery } from 'graphql/me';

export const getHasSearchPermission = ({ token }) =>
  fetchUtil('/me/permissions/search').get({ token });

const getMe = ({ token }) =>
  graphqlClient({ query: getMeQuery, token }).then(data => data.me);

export default {
  getMe,
};
