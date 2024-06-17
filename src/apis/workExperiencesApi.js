import graphqlClient from 'utils/graphqlClient';
import { createWorkExperience as createWorkExperienceGql } from 'graphql/experience';

export const postWorkExperience = ({ body, token }) =>
  graphqlClient({
    query: createWorkExperienceGql,
    token,
    variables: {
      input: body,
    },
  });
