import { tokenSelector } from 'selectors/authSelector';
import { loginWithToken } from './auth';
import {
  sendVerifyEmail as sendVerifyEmailApi,
  verifyEmail as verifyEmailApi,
} from 'graphql/emailVerification';

export const sendVerifyEmail = ({ email, redirectUrl }) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return sendVerifyEmailApi({ token, email, redirectUrl }).catch(error => {
    console.error(error);
    throw error;
  });
};

export const verifyEmail = ({ verifyToken }) => (
  dispatch,
  getState,
  { history },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return verifyEmailApi({ token, verifyToken })
    .then(({ verifyEmail: { token, redirect_url } }) => {
      dispatch(loginWithToken(token));
      history.push(redirect_url);
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};
