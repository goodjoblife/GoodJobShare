import { tokenSelector } from '../selectors/authSelector';

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
    });
};
