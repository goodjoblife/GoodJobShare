import graphqlClient from 'utils/graphqlClient';
import { facebookLogin, googleLogin } from 'graphql/auth';

export const postAuthFacebook = ({ accessToken }) =>
  graphqlClient({
    query: facebookLogin,
    variables: {
      input: {
        accessToken,
      },
    },
  }).then(({ facebookLogin }) => facebookLogin);

export const postAuthGoogle = ({ idToken }) =>
  graphqlClient({
    query: googleLogin,
    variables: {
      input: {
        idToken,
      },
    },
  }).then(({ googleLogin }) => googleLogin);
