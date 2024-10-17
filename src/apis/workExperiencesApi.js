import graphqlClient from 'utils/graphqlClient';
import {
  createWorkExperience as createWorkExperienceGql,
  createWorkExperienceWithRating as createWorkExperienceWithRatingGql,
} from 'graphql/experience';

export const postWorkExperience = ({ body, token }) =>
  graphqlClient({
    query: createWorkExperienceGql,
    token,
    variables: {
      input: body,
    },
  }).then(({ createWorkExperience }) => createWorkExperience);

export const postWorkExperienceWithRating = ({ body, token }) =>
  graphqlClient({
    query: createWorkExperienceWithRatingGql,
    token,
    variables: {
      input: body,
    },
  }).then(
    ({ createWorkExperienceWithRating }) => createWorkExperienceWithRating,
  );
