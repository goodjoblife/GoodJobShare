import graphqlClient from 'utils/graphqlClient';
import { createInterviewExperience as createInterviewExperienceGql } from 'graphql/experience';

export const postInterviewExperience = ({ body, token }) =>
  graphqlClient({
    query: createInterviewExperienceGql,
    token,
    variables: {
      input: body,
    },
  });
