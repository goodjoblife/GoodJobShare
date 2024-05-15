import { tokenSelector } from 'selectors/authSelector';
import { postExperiencesReports as postExperiencesReportsApi } from 'apis/reportsExperiencesApi';

export const createReport = ({ experienceId, body }) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);

  return postExperiencesReportsApi({
    id: experienceId,
    body,
    token,
  });
};
