import {
  changeExperienceStatusGql,
  createExperienceLikeGql,
  deleteExpereinceLikeGql,
  queryExperienceLikeGql,
  queryExperienceRepliesGql,
} from 'graphql/experience';
import { getPopularExperiencesQuery } from 'graphql/popularExperience';
import { createReplyLike, deleteReplyLike } from 'graphql/reply';
import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';

export const queryExperienceReplies = async ({ id, token }) =>
  graphqlClient({
    query: queryExperienceRepliesGql,
    variables: { id },
    token,
  }).then(data => data.experience.replies);

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

export const changeExperienceStatus = ({ id, status, token }) =>
  graphqlClient({
    query: changeExperienceStatusGql,
    variables: { input: { id, status } },
    token,
  });
