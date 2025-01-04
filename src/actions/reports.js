import { tokenSelector } from 'selectors/authSelector';
import { postExperiencesReports as postExperiencesReportsApi } from 'apis/reportsExperiencesApi';
import { createExperienceReportApi } from 'apis/reports';

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

export const postExperiencesReports = ({ id, reason, reasonCategory }) => (
  _,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return createExperienceReportApi({
    id,
    reason,
    reasonCategory,
    token,
  }).catch(error => {
    console.error(error);
    throw error;
  });
};
