import { createUserFeedback as createUserFeedbackGql } from 'graphql/userFeedback';
import graphqlClient from 'utils/graphqlClient';

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
