import graphqlClient from 'utils/graphqlClient';
import { createInterviewExperienceWithOptionalRating as createInterviewExperienceGql } from 'graphql/experience';

export const postInterviewExperience = ({ body, token }) =>
  graphqlClient({
    query: createInterviewExperienceGql,
    token,
    variables: {
      input: body,
    },
  }).then(({ createInterviewExperience }) => createInterviewExperience);
