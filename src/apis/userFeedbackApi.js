import graphqlClient from 'utils/graphqlClient';
import { createUserFeedback as createUserFeedbackGql } from 'graphql/userFeedback';

export const postUserFeedback = ({ npsScore, content, token }) =>
  graphqlClient({
    query: createUserFeedbackGql,
    token,
    variables: {
      input: {
        content,
        npsScore,
      },
    },
  });

export default {
  postUserFeedback,
};
