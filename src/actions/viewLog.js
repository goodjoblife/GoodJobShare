import { tokenSelector } from '../selectors/authSelector';

export const viewSalaryWorkTimes = ({ content_ids, referrer }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);
  return api.viewLog.viewSalaryWorkTimes({ token, content_ids, referrer });
};
