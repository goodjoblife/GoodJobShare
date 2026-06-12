import { createWorkExperienceWithRating as createWorkExperienceWithRatingGql } from 'graphql/experience';
import graphqlClient from 'utils/graphqlClient';

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
