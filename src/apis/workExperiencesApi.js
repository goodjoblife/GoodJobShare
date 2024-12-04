import graphqlClient from 'utils/graphqlClient';
import { createWorkExperienceWithRating as createWorkExperienceWithRatingGql } from 'graphql/experience';

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
