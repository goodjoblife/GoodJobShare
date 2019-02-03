import qs from 'qs';
import R from 'ramda';

import fetchUtil from 'utils/fetchUtil';

const endpoint = '/experiences';

const getEndpoint = ({ id, limit = 3 }) =>
  `${endpoint}/${id}/recommended?limit=${limit}`;
const fetch = ({ id, limit }) => fetchUtil(getEndpoint({ id, limit }));

export const getExperiencesRecommended = ({ id, limit }) =>
  fetch({ id, limit }).get();

export const getExperiences = ({
  start,
  limit,
  searchBy,
  searchQuery,
  sort,
  searchType = ['interview', 'work'],
}) => {
  const queryObj = {
    start,
    limit,
    search_by: searchBy,
    search_query: searchQuery,
    sort,
    type: R.join(',', searchType),
  };
  const queryString = qs.stringify(queryObj);

  const url = queryString ? `${endpoint}?${queryString}` : `${endpoint}`;

  return fetchUtil(url).get();
};

const getExperienceReplyOptions = {
  start: 0,
  limit: 100,
};

export const getExperienceReply = options => {
  const finalOptions = {
    ...getExperienceReplyOptions,
    ...options,
  };

  const { experienceId, start, limit } = finalOptions;

  const url = `/experiences/${experienceId}/replies`;
  const queryString = qs.stringify({
    start,
    limit,
  });

  return fetchUtil(queryString ? `${url}?${queryString}` : url).get();
};

export const postExperienceReply = ({ id, comment }) =>
  fetchUtil(`/experiences/${id}/replies`).post({
    body: {
      content: comment,
    },
  });

export const deleteExperienceLikes = ({ id }) =>
  fetchUtil(`/experiences/${id}/likes`).delete();

export const postExperienceLikes = ({ id }) =>
  fetchUtil(`/experiences/${id}/likes`).post();

export const deleteReplyLikes = ({ id }) =>
  fetchUtil(`/replies/${id}/likes`).delete();

export const postReplyLikes = ({ id }) =>
  fetchUtil(`/replies/${id}/likes`).post();

const patchReply = ({ id, status }) =>
  fetchUtil(`/replies/${id}`).patch({
    body: {
      status,
    },
  });

export const getExperience = ({ id }) => fetchUtil(`/experiences/${id}`).get();

export const newExperienceSearchBy = ({ body }) =>
  fetchUtil('/graphql').post({ body });

const patchExperience = ({ id, status }) =>
  fetchUtil(`/experiences/${id}`).patch({
    body: {
      status,
    },
  });

export default {
  getExperience,
  getExperiencesRecommended,
  getExperiences,
  getExperienceReply,
  postExperienceReply,
  deleteExperienceLikes,
  postExperienceLikes,
  deleteReplyLikes,
  postReplyLikes,
  newExperienceSearchBy,
  patchExperience,
  patchReply,
};
