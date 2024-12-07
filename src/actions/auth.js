import ReactGA from 'react-ga4';
import {
  postAuthFacebook as postAuthFacebookApi,
  postAuthGoogle as postAuthGoogleApi,
} from 'apis/auth';
import { queryMeApi } from 'apis/me';
import authStatus from 'constants/authStatus';
import { pushErrorNotificationAndRollbarAndThrowError } from 'actions/toastNotification';
import { GraphqlError } from 'utils/errors';
import * as ERROR_CODE from 'constants/errorCodeMsg';

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

/**
 * Use `hooks/login/useFacebookLogin` as possible
 */
export const loginWithFB = FBSDK => async (dispatch, getState) => {
  if (!FBSDK) {
    dispatch(pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0001));
  }

  let fbLoginResponse = null;
  try {
    // invoke FB SDK Login to get FB-issued access token
    fbLoginResponse = await FBSDKLogin(FBSDK);
  } catch (error) {
    dispatch(
      pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0002, error),
    );
  }

  if (!fbLoginResponse || !fbLoginResponse.status) {
    dispatch(pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0003));
  }

  switch (fbLoginResponse.status) {
    case authStatus.CANCELED:
      return;
    case authStatus.NOT_AUTHORIZED:
      dispatch(setLogin(authStatus.NOT_AUTHORIZED));
      dispatch(pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0004));
      break;
    case authStatus.CONNECTED:
      try {
        // call GoodJob GraphQL API to get JWT token issued by GoodJob
        const { token } = await postAuthFacebookApi({
          accessToken: fbLoginResponse.authResponse.accessToken,
        });
        await dispatch(loginWithToken(token));
      } catch (error) {
        if (error instanceof GraphqlError && error.codes) {
          if (error.codes[0] === 'UNAUTHENTICATED') {
            dispatch(
              pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0014),
            );
            break;
          } else if (error.codes[0] === 'FORBIDDEN') {
            dispatch(
              pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0015),
            );
            break;
          }
        }
        dispatch(
          pushErrorNotificationAndRollbarAndThrowError(
            ERROR_CODE.ER0016,
            error,
          ),
        );
      }
      break;
    default:
      dispatch(
        pushErrorNotificationAndRollbarAndThrowError(
          ERROR_CODE.ER0006,
          null,
          fbLoginResponse,
        ),
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
  if (!credentialResponse || !credentialResponse.credential) {
    dispatch(pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0009));
  }
  const idToken = credentialResponse.credential;
  try {
    const response = await postAuthGoogleApi({ idToken });
    if (response && response.token) {
      await dispatch(loginWithToken(response.token));
    } else {
      dispatch(pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0010));
    }
  } catch (error) {
    if (error instanceof GraphqlError && error.codes) {
      if (error.codes[0] === 'UNAUTHENTICATED') {
        dispatch(
          pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0011),
        );
        return;
      } else if (error.codes[0] === 'FORBIDDEN') {
        dispatch(
          pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0012),
        );
        return;
      }
    }
    dispatch(
      pushErrorNotificationAndRollbarAndThrowError(ERROR_CODE.ER0013, error),
    );
  }
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
