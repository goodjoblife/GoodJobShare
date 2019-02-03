import fetchUtil from 'utils/fetchUtil';

const getMeExperiences = ({ token }) =>
  fetchUtil('/me/experiences').get({ token });
const getMeWorkings = ({ token }) => fetchUtil('/me/workings').get({ token });
const getMeReplies = ({ token }) => fetchUtil('/me/replies').get({ token });

export const getHasSearchPermission = ({ token }) =>
  fetchUtil('/me/permissions/search').get({ token });

export default {
  getMeExperiences,
  getMeWorkings,
  getMeReplies,
};
