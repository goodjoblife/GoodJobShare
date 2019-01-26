import fetchUtil from 'utils/fetchUtil';

const getMeExperiences = () => fetchUtil('/me/experiences')('GET');
const getMeWorkings = () => fetchUtil('/me/workings')('GET');
const getMeReplies = () => fetchUtil('/me/replies')('GET');

export const getHasSearchPermission = () =>
  fetchUtil('/me/permissions/search')('GET');

export default {
  getMeExperiences,
  getMeWorkings,
  getMeReplies,
};
