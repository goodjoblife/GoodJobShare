import fetchingStatus, { isUnfetched } from '../constants/status';
import { tokenSelector } from '../selectors/authSelector';

export const SET_SALARY_WORK_TIME_COUNT =
  '@@TIME_AND_SALARY/SET_SALARY_WORK_TIME_COUNT';

const setCountData = (count, status, error = null) => ({
  type: SET_SALARY_WORK_TIME_COUNT,
  count,
  status,
  error,
});

export const queryTimeAndSalaryCount = () => (dispatch, getState, { api }) => {
  dispatch(setCountData(0, fetchingStatus.FETCHING));

  return api.timeAndSalary
    .fetchTimeAndSalaryCount()
    .then(count => {
      dispatch(setCountData(count, fetchingStatus.FETCHED));
    })
    .catch(error => {
      dispatch(setCountData(0, fetchingStatus.ERROR, error));
      throw error;
    });
};

export const queryTimeAndSalaryCountIfUnfetched = () => (
  dispatch,
  getState,
) => {
  if (isUnfetched(getState().timeAndSalary.countStatus)) {
    return dispatch(queryTimeAndSalaryCount());
  }
  return Promise.resolve();
};

export const createSalaryWorkTime = ({ body }) => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const token = tokenSelector(state);

  return api.timeAndSalary.postWorkings({
    body,
    token,
  });
};
