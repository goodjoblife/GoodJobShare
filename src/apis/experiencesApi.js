import fetchUtil from 'utils/fetchUtil';

import graphqlClient from 'utils/graphqlClient';
import {
  deleteExpereinceLikeGql,
  createExperienceLikeGql,
  queryExperienceGql,
  queryExperienceLikeGql,
  queryRelatedExperiencesGql,
  queryExperienceCountGql,
} from 'graphql/experience';
import { getPopularExperiencesQuery } from 'graphql/popularExperience';
import { deleteReplyLike, createReplyLike } from 'graphql/reply';

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

export const deleteExperienceLikesApi = ({ id, token }) =>
  graphqlClient({
    query: deleteExpereinceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  });

export const createExperienceLikeApi = ({ id, token }) =>
  graphqlClient({
    query: createExperienceLikeGql,
    variables: { input: { experience_id: id } },
    token,
  });

export const deleteReplyLikes = ({ id, token }) =>
  graphqlClient({
    query: deleteReplyLike,
    variables: { input: { reply_id: id } },
    token,
  });

export const postReplyLikes = ({ id, token }) =>
  graphqlClient({
    query: createReplyLike,
    variables: { input: { reply_id: id } },
    token,
  });

export const patchReply = ({ id, status, token }) =>
  fetchUtil(`/replies/${id}`).patch({
    body: {
      status,
    },
    token,
  });

export const queryExperience = ({ id }) =>
  graphqlClient({
    query: queryExperienceGql,
    variables: { id },
  }).then(data => data.experience);

export const queryExperienceLike = async ({ id, token }) => {
  const data = await graphqlClient({
    query: queryExperienceLikeGql,
    variables: { id },
    token,
  });

  return data.experience.liked;
};

export const getPopularExperiences = () =>
  graphqlClient({
    query: getPopularExperiencesQuery,
  }).then(data => data.popular_experiences);

export const patchExperience = ({ id, status, token }) =>
  fetchUtil(`/experiences/${id}`).patch({
    body: {
      status,
    },
    token,
  });

export const queryRelatedExperiences = async ({ id, start, limit }) => {
  const data = await graphqlClient({
    query: queryRelatedExperiencesGql,
    variables: { id, start, limit },
  });
  return data.experience.relatedExperiences;
};

export const queryExperienceCountApi = async () => {
  const data = await graphqlClient({
    query: queryExperienceCountGql,
  });
  return data.experienceCount;
};
