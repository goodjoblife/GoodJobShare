import authStatus from '../constants/authStatus';

export const SET_LOGIN = '@@auth/SET_LOGIN';
export const SET_USER = '@@auth/SET_USER';

export const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const loginWithFB = FB => (dispatch, getState, { api }) => {
  if (FB) {
    return new Promise(resolve => FB.login(response => resolve(response))).then(
      response => {
        if (response.status === authStatus.CONNECTED) {
          return api.auth
            .postAuthFacebook({
              accessToken: response.authResponse.accessToken,
            })
            .then(({ token, user: { _id, facebook_id } }) => {
              dispatch(setLogin(authStatus.CONNECTED, token));
              dispatch(getMe(token));
            })
            .then(() => authStatus.CONNECTED);
        } else if (response.status === authStatus.NOT_AUTHORIZED) {
          dispatch(setLogin(authStatus.NOT_AUTHORIZED));
        }
        return response.status;
      },
    );
  }
  return Promise.reject('FB should ready');
};

const getMe = token => (dispatch, getState, { api }) =>
  api.me.getMe({ token }).then(user => dispatch(setUser(user)));

export const logout = FB => dispatch => {
  if (FB) {
    return new Promise(resolve =>
      FB.logout(response => resolve(response)),
    ).then(response => {
      if (response.status === authStatus.UNKNOWN) {
        dispatch(setLogin(response.status, response.authResponse.accessToken));
        dispatch(setUser({ name: null }));
      }
      return response.status;
    });
  }
  return Promise.reject('FB should ready');
};

export const setAuthForFB = (status, accessToken) => async (
  dispatch,
  getState,
  { api },
) => {
  if (status !== authStatus.CONNECTED) {
    await dispatch(setLogin(status));
    return;
  }

  const response = await api.auth.postAuthFacebook({ accessToken });
  if (response.error) {
    await dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    return;
  }
  const { token } = response;
  await dispatch(setLogin(authStatus.CONNECTED, token));
};
