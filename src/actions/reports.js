import { tokenSelector } from 'selectors/authSelector';
import {
  createExperienceReportApi,
  createSalaryWorkTimeReportApi,
} from 'apis/reports';

export const postExperienceReport = ({ id, reason, reasonCategory }) => (
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

export const postSalaryWorkTimeReport = ({ id, reason, reasonCategory }) => (
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
    console.error(error);
    throw error;
  });
};
