import ReactGA from 'react-ga4';
import {
  postAuthFacebook as postAuthFacebookApi,
  postAuthGoogle as postAuthGoogleApi,
} from 'apis/auth';
import { queryMeApi } from 'apis/me';
import authStatus from 'constants/authStatus';

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
};

/**
 * Use `hooks/login/useFacebookLogin` as possible
 */
export const loginWithFB = FB => (dispatch, getState) => {
  if (FB) {
    return new Promise(resolve =>
      FB.login(response => resolve(response), { scope: 'email' }),
    ).then(response => {
      if (response.status === authStatus.CONNECTED) {
        return postAuthFacebookApi({
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
 * Google prevent user to customize login button
 * Use `common/Auth/GoogleLoginButton` as possible
 * GoogleLoginButton wraps the "Google button flow" with react to render
 * "Sign in with Google" buttons
 * https://developers.google.com/identity/gsi/web/guides/integrate#button_customization
 */
export const loginWithGoogle = credentialResponse => async (
  dispatch,
  getState,
) => {
  //  TODO: 當登入失敗
  const idToken = credentialResponse.credential;
  const { token } = await postAuthGoogleApi({ idToken });
  await dispatch(loginWithToken(token));
};

const getMeInfo = token => (dispatch, getState) =>
  queryMeApi({ token }).catch(error => {
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
export const loginWithToken = token => (dispatch, getState) => {
  dispatch(getMeInfo(token))
    .then(user => {
      dispatch(setUser(user));
      dispatch(setLogin(authStatus.CONNECTED, token));
      // identify user for Google Analytics
      ReactGA.set({ userId: user._id });
    })
    .catch(error => {
      console.error(error);
      dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    });
};
