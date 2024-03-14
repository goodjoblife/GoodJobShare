import graphqlClient from 'utils/graphqlClient';
import { createUserFeedback as createUserFeedbackGql } from 'graphql/userFeedback';

export const postUserFeedback = ({ body, token }) =>
  graphqlClient({
    query: createUserFeedbackGql,
    token,
    variables: {
      input: body,
    },
  });

export default {
  postUserFeedback,
};
