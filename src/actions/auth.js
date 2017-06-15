export const SET_LOGIN = '@@auth/SET_LOGIN';
export const SET_USER = '@@auth/SET_USER';

export const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});

export const setUser = ({ name }) => ({
  type: SET_USER,
  name,
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

export const getMe = FB => (dispatch, getState) => {
  if (!FB) {
    return Promise.reject('FB should ready');
  }
  if (getState().auth.get('status') !== 'connected') {
    return Promise.reject('auth status should be connected');
  }
  return new Promise(resolve => FB.api('/me', response => resolve(response)))
    .then(response => {
      dispatch(setUser(response));
      return response;
    });
};
