import R from 'ramda';

import fetchUtil from 'utils/fetchUtil';

import graphqlClient from 'utils/graphqlClient';
import { getExperienceQuery } from 'graphql/experience';
import { getPopularExperiencesQuery } from 'graphql/popularExperience';

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

  return fetchUtil(endpoint).get({ query: queryObj });
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

  const { experienceId, start, limit, token } = finalOptions;

  const url = `/experiences/${experienceId}/replies`;

  return fetchUtil(url).get({
    query: {
      start,
      limit,
    },
    token,
  });
};

export const postExperienceReply = ({ id, comment, token }) =>
  fetchUtil(`/experiences/${id}/replies`).post({
    body: {
      content: comment,
    },
    token,
  });

export const deleteExperienceLikes = ({ id, token }) =>
  fetchUtil(`/experiences/${id}/likes`).delete({ token });

export const postExperienceLikes = ({ id, token }) =>
  fetchUtil(`/experiences/${id}/likes`).post({ token });

export const deleteReplyLikes = ({ id, token }) =>
  fetchUtil(`/replies/${id}/likes`).delete({ token });

export const postReplyLikes = ({ id, token }) =>
  fetchUtil(`/replies/${id}/likes`).post({ token });

const patchReply = ({ id, status, token }) =>
  fetchUtil(`/replies/${id}`).patch({
    body: {
      status,
    },
    token,
  });

export const getExperience = ({ id, token }) =>
  graphqlClient({
    query: getExperienceQuery,
    variables: { id },
    token,
  }).then(data => data.experience);

export const getPopularExperiences = ({ token }) =>
  graphqlClient({
    query: getPopularExperiencesQuery,
    token,
  }).then(data => data.popular_experiences);

export const newExperienceSearchBy = ({ body }) =>
  fetchUtil('/graphql').post({ body });

const patchExperience = ({ id, status, token }) =>
  fetchUtil(`/experiences/${id}`).patch({
    body: {
      status,
    },
    token,
  });

export default {
  getExperience,
  getPopularExperiences,
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
