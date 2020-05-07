import ReactGA from 'react-ga';
import authStatus from '../constants/authStatus';
import { UserModule } from '../utils/eventBasedTracking';

export const SET_LOGIN = '@@auth/SET_LOGIN';
export const SET_USER = '@@auth/SET_USER';
export const LOG_OUT = '@@auth/LOG_OUT';

const setLogin = (status, token = null) => ({
  type: SET_LOGIN,
  status,
  token,
});

const setUser = user => ({
  type: SET_USER,
  user,
});

const logOutAction = () => ({
  type: LOG_OUT,
});

export const logout = () => (dispatch, getState, { history }) => {
  dispatch(logOutAction());
  history.push('/');
  // reset user for Amplitude
  UserModule.resetUser();
};

/**
 * Use `hooks/login/useFacebookLogin` as possible
 */
export const loginWithFB = FB => (dispatch, getState, { api }) => {
  if (FB) {
    return new Promise(resolve =>
      FB.login(response => resolve(response), { scope: 'email' }),
    ).then(response => {
      if (response.status === authStatus.CONNECTED) {
        return api.auth
          .postAuthFacebook({
            accessToken: response.authResponse.accessToken,
          })
          .then(({ token, user: { _id, facebook_id } }) =>
            dispatch(loginWithToken(token)),
          )
          .then(() => authStatus.CONNECTED);
      } else if (response.status === authStatus.NOT_AUTHORIZED) {
        dispatch(setLogin(authStatus.NOT_AUTHORIZED));
      }
      return response.status;
    });
  }
  return Promise.reject(new Error('FB is not ready'));
};

/**
 * Use `hooks/login/useGoogleLogin` as possible
 */
export const loginWithGoogle = googleAuth => (dispatch, getState, { api }) => {
  return googleAuth
    .signIn({
      scope: 'profile email',
      prompt: 'select_account',
    })
    .then(result => {
      const { id_token } = result.getAuthResponse();
      return api.auth
        .postAuthGoogle({
          idToken: id_token,
        })
        .then(({ token, user: { _id, google_id } }) => {
          dispatch(loginWithToken(token));
        })
        .then(() => authStatus.CONNECTED);
    })
    .catch(err => authStatus.NOT_AUTHORIZED);
};

const getMeInfo = token => (dispatch, getState, { api }) =>
  api.me.getMe({ token }).catch(error => {
    dispatch(logOutAction());
    throw error;
  });

/**
 * Flow
 *
 * loginWithFB   ---\                      |
 *          (token) +--> loginWithToken  --|
 * loginWithXXX  ---/                      | Auth State
 *                                         |   Update
 *                               logout  --|
 *                                         |
 */
export const loginWithToken = token => (dispatch, getState, { api }) => {
  dispatch(getMeInfo(token))
    .then(user => {
      dispatch(setUser(user));
      dispatch(setLogin(authStatus.CONNECTED, token));
      // identify user for Amplitude
      UserModule.identifyUser(user._id);
      // identify user for Google Analytics
      ReactGA.set({ userId: user._id });
    })
    .catch(error => {
      console.error(error);
      dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    });
};
