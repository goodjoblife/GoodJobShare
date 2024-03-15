import { tokenSelector } from 'selectors/authSelector';
import { postUserFeedback as postUserFeedbackApi } from 'apis/userFeedbackApi';

export const postUserFeedback = ({ content, npsScore }) => (
  dispatch,
  getState,
) => {
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

export default { postUserFeedback };
