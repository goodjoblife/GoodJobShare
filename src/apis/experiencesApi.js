import { ifElse, isNil, identity } from 'ramda';
import fetchUtil from 'utils/fetchUtil';

import graphqlClient from 'utils/graphqlClient';
import {
  queryExperienceRepliesGql,
  deleteExpereinceLikeGql,
  createExperienceLikeGql,
  queryExperienceGql,
  queryExperienceLikeGql,
  changeExperienceStatusGql,
  queryRelatedExperiencesGql,
  queryExperienceCountGql,
} from 'graphql/experience';
import { getPopularExperiencesQuery } from 'graphql/popularExperience';
import { deleteReplyLike, createReplyLike } from 'graphql/reply';

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

const resolveSubtitleInSection = ({
  __typename,
  interview_subtitle,
  work_subtitle,
}) => {
  switch (__typename) {
    case 'InterviewExperience':
      return interview_subtitle;
    case 'WorkExperience':
      return work_subtitle;
    default:
      return null;
  }
};

const resolveSubtitlesInExperience = ({ __typename, sections, ...rest }) => ({
  ...rest,
  sections: sections.map(({ interview_subtitle, work_subtitle, ...rest }) => ({
    ...rest,
    subtitle: resolveSubtitleInSection({
      __typename,
      interview_subtitle,
      work_subtitle,
    }),
  })),
});

export const queryExperience = ({ id }) =>
  graphqlClient({
    query: queryExperienceGql,
    variables: { id },
  })
    .then(data => data.experience)
    .then(ifElse(isNil, identity, resolveSubtitlesInExperience));

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

export const queryRelatedExperiences = async ({ id, start, limit }) => {
  const data = await graphqlClient({
    query: queryRelatedExperiencesGql,
    variables: { id, start, limit },
  });
  const relatedExperiences = data.experience.relatedExperiences;
  return relatedExperiences.map(resolveSubtitlesInExperience);
};

export const queryExperienceCountApi = async () => {
  const data = await graphqlClient({
    query: queryExperienceCountGql,
  });
  return data.experienceCount;
};
