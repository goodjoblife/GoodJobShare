import fetchUtil from 'utils/fetchUtil';
import graphqlClient from 'utils/graphqlClient';
import { facebookLogin } from 'graphql/auth';

const endpoint = '/auth';

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
  fetchUtil(`${endpoint}/google`).post({
    body: { id_token: idToken },
  });

export default {
  postAuthFacebook,
  postAuthGoogle,
};
