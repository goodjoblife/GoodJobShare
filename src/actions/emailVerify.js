import { tokenSelector } from '../selectors/authSelector';
import { loginWithToken } from './auth';

export const sendVerifyEmail = ({ email, redirectUrl }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return api.emailVerify
    .sendVerifyEmail({ token, email, redirectUrl })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const verifyEmail = ({ verifyToken }) => (
  dispatch,
  getState,
  { api, history },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return api.emailVerify
    .verifyEmail({ token, verifyToken })
    .then(({ verifyEmail: { token, redirect_url } }) => {
      dispatch(loginWithToken(token));
      history.push(redirect_url);
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};
