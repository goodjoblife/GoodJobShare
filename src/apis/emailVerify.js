import graphqlClient from 'utils/graphqlClient';

import {
  sendVerifyEmail as sendVerifyEmailGql,
  verifyEmail as verifyEmailGql,
} from 'graphql/emailVerification';

export const sendVerifyEmail = ({ token, email, redirectUrl }) =>
  graphqlClient({
    query: sendVerifyEmailGql,
    token,
    variables: {
      input: {
        email,
        redirect_url: redirectUrl,
      },
    },
  });

export const verifyEmail = ({ token, verifyToken }) =>
  graphqlClient({
    query: verifyEmailGql,
    token,
    variables: {
      input: {
        token: verifyToken,
      },
    },
  });
