import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';

import { getMeQuery } from 'graphql/me';

const getMeExperiences = ({ token }) =>
  fetchUtil('/me/experiences').get({ token });
const getMeWorkings = ({ token }) => fetchUtil('/me/workings').get({ token });
const getMeReplies = ({ token }) => fetchUtil('/me/replies').get({ token });

export const getHasSearchPermission = ({ token }) =>
  fetchUtil('/me/permissions/search').get({ token });

const getMe = ({ token }) =>
  graphqlClient({ query: getMeQuery, token }).then(data => data.me);

export default {
  getMeExperiences,
  getMeWorkings,
  getMeReplies,
  getMe,
};
