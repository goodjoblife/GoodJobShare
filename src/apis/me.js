import fetchUtil from 'utils/fetchUtil';

const getMeExperiences = () => fetchUtil('/me/experiences').get();
const getMeWorkings = () => fetchUtil('/me/workings').get();
const getMeReplies = () => fetchUtil('/me/replies').get();

export const getHasSearchPermission = () =>
  fetchUtil('/me/permissions/search').get();

export default {
  getMeExperiences,
  getMeWorkings,
  getMeReplies,
};
