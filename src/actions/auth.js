import authStatus from '../constants/authStatus';

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

export const loginWithFB = FB => (dispatch, getState, { api }) => {
  if (FB) {
    return new Promise(resolve => FB.login(response => resolve(response))).then(
      response => {
        if (response.status === authStatus.CONNECTED) {
          return api.auth
            .postAuthFacebook(response.authResponse.accessToken)
            .then(({ token, user: { _id, facebook_id } }) =>
              dispatch(setLogin(authStatus.CONNECTED, token)),
            )
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

  const response = await api.auth.postAuthFacebook(accessToken);
  if (response.error) {
    await dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    return;
  }
  const { token } = response;
  await dispatch(setLogin(authStatus.CONNECTED, token));
};

export const getMe = FB => (dispatch, getState) => {
  if (!FB) {
    return Promise.reject('FB should ready');
  }
  if (getState().auth.get('status') !== authStatus.CONNECTED) {
    return Promise.reject('auth status should be connected');
  }
  return new Promise(resolve =>
    FB.api('/me', response => resolve(response)),
  ).then(response => {
    dispatch(setUser(response));
    return response;
  });
};
