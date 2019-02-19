import { tokenSelector } from '../selectors/authSelector';

export const createReport = ({ experienceId, body }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.reportsExperiences.postExperiencesReports({
    id: experienceId,
    body,
    token,
  });
};
