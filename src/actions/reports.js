import { tokenSelector } from 'selectors/authSelector';
import {
  createExperienceReportApi,
  createSalaryWorkTimeReportApi,
} from 'apis/reports';

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
  }).catch(error => {
    throw error;
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
  }).catch(error => {
    throw error;
  });
};
