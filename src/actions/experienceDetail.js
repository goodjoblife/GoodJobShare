import { tokenSelector } from '../selectors/authSelector';

export const createReply = (experienceId, comment) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.experiences.postExperienceReply({
    id: experienceId,
    comment,
    token,
  });
};
