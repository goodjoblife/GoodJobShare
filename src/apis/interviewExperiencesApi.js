import { createInterviewExperienceWithRating as createInterviewExperienceGql } from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

export const postInterviewExperience = ({ body, token }) =>
  graphqlClient({
    query: createInterviewExperienceGql,
    token,
    variables: {
      input: body,
    },
  }).then(
    ({ createInterviewExperienceWithRating }) =>
      createInterviewExperienceWithRating,
  );
