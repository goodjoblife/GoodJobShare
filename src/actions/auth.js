import authStatus from '../constants/authStatus';
import { tokenSelector } from '../selectors/authSelector';

export const SET_LOGIN = '@@auth/SET_LOGIN';
export const SET_USER = '@@auth/SET_USER';
export const LOG_OUT = '@@auth/LOG_OUT';

export const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

const logOutAction = () => ({
  type: LOG_OUT,
});

export const logout = () => (dispatch, getState, { history }) => {
  dispatch(logOutAction());
  history.push('/');
};

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
              dispatch(getMeInfo(token));
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

export const loginWithToken = () => (dispatch, getState, { api }) => {
  const state = getState();
  const token = tokenSelector(state);

  return dispatch(getMeInfo(token));
};

export const getMeInfo = token => (dispatch, getState, { api }) =>
  api.me
    .getMe({ token })
    .then(user => dispatch(setUser(user)))
    .catch(error => {
      dispatch(logOutAction());

      console.error(error);
    });
