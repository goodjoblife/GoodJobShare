import ReactGA from 'react-ga4';
import {
  postAuthFacebook as postAuthFacebookApi,
  postAuthGoogle as postAuthGoogleApi,
} from 'apis/auth';
import { queryMeApi } from 'apis/me';
import authStatus from 'constants/authStatus';
import rollbar from 'utils/rollbar';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import { pushNotification } from '../actions/toastNotification';

export const SET_LOGIN = '@@auth/SET_LOGIN';
export const SET_USER = '@@auth/SET_USER';
export const LOG_OUT = '@@auth/LOG_OUT';

const LOGIN_ERROR_MSG =
  '登入時發生錯誤，若持續發生，請聯繫 findyourgoodjob@gmail.com';

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

// Wrap FB SDK login as promise
const FBSDKLogin = async FB => {
  return new Promise(resolve => {
    return FB.login(response => resolve(response), { scope: 'email' });
  });
};

const dispatchLoginErrorToast = (dispatch, message) => {
  dispatch(pushNotification(NOTIFICATION_TYPE.ALERT, message));
};

/**
 * Use `hooks/login/useFacebookLogin` as possible
 */
export const loginWithFB = FBSDK => async (dispatch, getState) => {
  if (!FBSDK) {
    dispatchLoginErrorToast(dispatch, `[ER0001] ${LOGIN_ERROR_MSG}`);
    rollbar.error('[ER0001] FB SDK is not ready');
    throw new Error('[ER0001] FB SDK is not ready');
  }

  let fbLoginResponse = null;
  try {
    // invoke FB SDK Login to get FB-issued access token
    fbLoginResponse = await FBSDKLogin(FBSDK);
  } catch (error) {
    dispatchLoginErrorToast(dispatch, `[ER0002] ${LOGIN_ERROR_MSG}`);
    rollbar.error(`[ER0002] FB SDK login failed: ${error}`);
    throw new Error(`[ER0002] FB SDK login failed: ${error}`);
  }

  if (!fbLoginResponse || !fbLoginResponse.status) {
    dispatchLoginErrorToast(dispatch, `[ER0003] ${LOGIN_ERROR_MSG}`);
    rollbar.error(
      `[ER0003] FB login response is empty or does not have status field`,
    );
    throw new Error(
      `[ER0003] FB login response is empty or does not have status field`,
    );
  }

  if (fbLoginResponse.status === authStatus.NOT_AUTHORIZED) {
    dispatchLoginErrorToast(dispatch, `[ER0004] ${LOGIN_ERROR_MSG}`);
    rollbar.error(`[ER0004] FB login failed: unauthorized`);
    dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    throw new Error(`[ER0004] FB login failed: unauthorized`);
  }

  if (fbLoginResponse.status === authStatus.CONNECTED) {
    try {
      // call GoodJob GraphQL API to get JWT token issued by GoodJob
      const { token } = await postAuthFacebookApi({
        accessToken: fbLoginResponse.authResponse.accessToken,
      });
      await dispatch(loginWithToken(token));
    } catch (error) {
      dispatchLoginErrorToast(dispatch, `[ER0005] ${LOGIN_ERROR_MSG}`);
      rollbar.error(`[ER0005] Graphql mutation facebookLogin failed: ${error}`);
      throw new Error(
        `[ER0005] Graphql mutation facebookLogin failed: ${error}`,
      );
    }
  } else {
    dispatchLoginErrorToast(dispatch, `[ER0006] ${LOGIN_ERROR_MSG}`);
    rollbar.error(
      `[ER0006] FB login failed: unknown auth status: ${fbLoginResponse.status}`,
    );
    throw new Error(
      `[ER0006] FB login failed: unknown auth status: ${fbLoginResponse.status}`,
    );
  }
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
