import ReactGA from 'react-ga4';
import {
  postAuthFacebook as postAuthFacebookApi,
  postAuthGoogle as postAuthGoogleApi,
} from 'apis/auth';
import { queryMeApi } from 'apis/me';
import authStatus from 'constants/authStatus';
import rollbar from 'utils/rollbar';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import { ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { pushNotification } from '../actions/toastNotification';

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

// Wrap FB SDK login as promise
const FBSDKLogin = FB => {
  return new Promise(resolve => {
    return FB.login(response => resolve(response), { scope: 'email' });
  });
};

const composeErrMsg = (code, message, error) => {
  if (error) {
    return `[${code}] ${message}: ${error}`;
  } else {
    return `[${code}] ${message}`;
  }
};
const loginErrorToast = (code, message) =>
  pushNotification(NOTIFICATION_TYPE.ALERT, composeErrMsg(code, message));

const dispatchNotificationAndRollbarAndThrowError = (
  dispatch,
  errorCode,
  error,
) => {
  dispatch(loginErrorToast(errorCode, ERROR_CODE_MSG[errorCode].external));
  const internalMsg = composeErrMsg(
    errorCode,
    ERROR_CODE_MSG[errorCode].internal,
    error,
  );
  rollbar.error(internalMsg);
  throw new Error(internalMsg);
};

/**
 * Use `hooks/login/useFacebookLogin` as possible
 */
export const loginWithFB = FBSDK => async (dispatch, getState) => {
  if (!FBSDK) {
    dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0001');
  }

  let fbLoginResponse = null;
  try {
    // invoke FB SDK Login to get FB-issued access token
    fbLoginResponse = await FBSDKLogin(FBSDK);
  } catch (error) {
    dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0002', error);
  }

  if (!fbLoginResponse || !fbLoginResponse.status) {
    dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0003');
  }

  if (fbLoginResponse.status === authStatus.CANCELED) {
    return;
  }

  if (fbLoginResponse.status === authStatus.NOT_AUTHORIZED) {
    dispatch(setLogin(authStatus.NOT_AUTHORIZED));
    dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0004');
  }

  if (fbLoginResponse.status === authStatus.CONNECTED) {
    try {
      // call GoodJob GraphQL API to get JWT token issued by GoodJob
      const { token } = await postAuthFacebookApi({
        accessToken: fbLoginResponse.authResponse.accessToken,
      });
      await dispatch(loginWithToken(token));
    } catch (error) {
      dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0005', error);
    }
  } else {
    dispatchNotificationAndRollbarAndThrowError(dispatch, 'ER0006');
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
