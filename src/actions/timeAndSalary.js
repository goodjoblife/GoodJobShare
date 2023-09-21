import fetchingStatus, { isUnfetched } from 'constants/status';
import { tokenSelector } from '../selectors/authSelector';
import {
  postWorkings as postWorkingsApi,
  fetchTimeAndSalaryCount as fetchTimeAndSalaryCountApi,
} from 'apis/timeAndSalaryApi';

export const SET_COUNT_DATA = '@@TIME_AND_SALARY/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryTimeAndSalaryCount = () => (dispatch, getState) => {
  dispatch(setCountData(0, fetchingStatus.FETCHING));

  return fetchTimeAndSalaryCountApi()
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
  if (isUnfetched(getState().timeAndSalary.get('countStatus'))) {
    return dispatch(queryTimeAndSalaryCount());
  }
  return Promise.resolve();
};

export const createSalaryWorkTime = ({ body }) => (dispatch, getState) => {
  const state = getState();
  const token = tokenSelector(state);

  return postWorkingsApi({
    body,
    token,
  });
};
