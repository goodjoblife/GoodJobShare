import { postUserFeedback as postUserFeedbackApi } from 'apis/userFeedbackApi';
import { tokenSelector } from 'selectors/authSelector';

export const postUserFeedback = ({ content, npsScore }) => (_, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return postUserFeedbackApi({
    token,
    content,
    npsScore,
  }).catch(error => {
    console.error(error);
    throw error;
  });
};
