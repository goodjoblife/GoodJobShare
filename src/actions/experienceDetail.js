import { tokenSelector } from 'selectors/authSelector';
import { postExperienceReply as createExperienceReplyApi } from 'apis/experiencesApi';

export const createReply = (experienceId, comment) => (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return createExperienceReplyApi({
    id: experienceId,
    comment,
    token,
  });
};
