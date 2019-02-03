import fetchUtil from 'utils/fetchUtil';

const endpoint = '/auth';

const postAuthFacebook = accessToken =>
  fetchUtil(`${endpoint}/facebook`).post({
    body: { access_token: accessToken },
  });

export default {
  postAuthFacebook,
};
