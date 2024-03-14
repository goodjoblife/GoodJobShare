import { tokenSelector } from 'selectors/authSelector';
import { postUserFeedback as postUserFeedbackApi } from 'apis/userFeedbackApi';

export const createUserFeedback = ({ body }) => (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return postUserFeedbackApi({
    body,
    token,
  });
};
