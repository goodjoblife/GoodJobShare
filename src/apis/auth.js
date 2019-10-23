import fetchUtil from 'utils/fetchUtil';

const endpoint = '/auth';

const postAuthFacebook = ({ accessToken }) =>
  fetchUtil(`${endpoint}/facebook`).post({
    body: { access_token: accessToken },
  });

const postAuthGoogle = ({ idToken }) =>
  fetchUtil(`${endpoint}/google`).post({
    body: { id_token: idToken },
  });

export default {
  postAuthFacebook,
  postAuthGoogle,
};
