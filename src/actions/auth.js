export const SET_LOGIN = '@@auth/SET_LOGIN';

export const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});

export const login = FB => dispatch => {
  if (FB) {
    return new Promise(resolve => FB.login(response => resolve(response)))
      .then(response => {
        if (response.status === 'connected') {
          dispatch(setLogin(response.status, response.authResponse.accessToken));
        } else if (response.status === 'not_authorized') {
          dispatch(setLogin(response.status));
        }
        return response.status;
      });
  }
  return Promise.reject('FB should ready');
};

export const getLoginStatus = FB => dispatch => {
  if (FB) {
    return new Promise(resolve => FB.getLoginStatus(response => resolve(response)))
      .then(response => {
        if (response.status === 'connected') {
          dispatch(setLogin(response.status, response.authResponse.accessToken));
        } else if (response.status === 'not_authorized') {
          dispatch(setLogin(response.status));
        }
        return response.status;
      });
  }
  return Promise.reject('FB should ready');
};
