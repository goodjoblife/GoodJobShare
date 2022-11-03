import graphqlClient from 'utils/graphqlClient';
import { facebookLogin, googleLogin } from 'graphql/auth';

const postAuthFacebook = ({ accessToken }) =>
  graphqlClient({
    query: facebookLogin,
    variables: {
      input: {
        accessToken,
      },
    },
  }).then(({ facebookLogin }) => facebookLogin);

const postAuthGoogle = ({ idToken }) =>
  graphqlClient({
    query: googleLogin,
    variables: {
      input: {
        idToken,
      },
    },
  }).then(({ googleLogin }) => googleLogin);

export default {
  postAuthFacebook,
  postAuthGoogle,
};
