import { tokenSelector } from '../selectors/authSelector';

export const viewSalaryWorkTimes = ({ contentIds, referrer }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return api.viewLog.viewSalaryWorkTimes({ token, contentIds, referrer });
};

export const viewExperiences = ({ contentIds, referrer }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return api.viewLog.viewExperiences({ token, contentIds, referrer });
};
