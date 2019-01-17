// import fetchUtil from 'utils/fetchUtil';

// const endpoint = '/auth';

// const getAuthFacebook = () => fetchUtil(`${endpoint}/facebook`)('get');

const mockAuthFacebook = accessToken =>
  Promise.resolve(accessToken)
    .then(console.log)
    .then(() => ({
      user: {
        _id: 123,
        facebook_id: 123,
      },
      token: 'iamtoken',
    }));

export default {
  getAuthFacebook: mockAuthFacebook,
};
