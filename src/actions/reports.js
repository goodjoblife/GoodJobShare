import {
  createExperienceReportApi,
  createSalaryWorkTimeReportApi,
} from 'apis/reports';
import { tokenSelector } from 'selectors/authSelector';

export const createExperienceReport = ({ id, reason, reasonCategory }) => (
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
  });
};

export const createSalaryWorkTimeReport = ({ id, reason, reasonCategory }) => (
  _,
  getState,
) => {
  const state = getState();
  const token = tokenSelector(state);
  return createSalaryWorkTimeReportApi({
    id,
    reason,
    reasonCategory,
    token,
  });
};
