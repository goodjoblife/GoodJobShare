import fetchUtil from 'utils/fetchUtil';

const endpoint = '/auth';

const postAuthFacebook = accessToken =>
  fetchUtil(`${endpoint}/facebook`)('post', { access_token: accessToken });

export default {
  postAuthFacebook,
};
