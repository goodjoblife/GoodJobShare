import { tokenSelector } from 'selectors/authSelector';
import { postExperiencesReports as postExperiencesReportsApi } from 'apis/reportsExperiencesApi';
import { postExperiencesReports as postExperiencesReportsGql } from 'apis/reportApi';

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

export const postExperiencesReports = ({ reason, reasonCategory }) => (
  _,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return postExperiencesReportsGql({ reason, reasonCategory, token });
};
