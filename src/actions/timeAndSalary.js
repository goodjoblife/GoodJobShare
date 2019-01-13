import R from 'ramda';
import { fetchTimeAndSalary } from '../apis/timeAndSalaryApi';
import fetchingStatus, { isUnfetched } from '../constants/status';

export const SET_COUNT_DATA = '@@TIME_AND_SALARY/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryTimeAndSalaryCount = () => dispatch => {
  dispatch(setCountData(0, fetchingStatus.FETCHING));

  const opt = {
    limit: 1,
  };

  return fetchTimeAndSalary({ opt })
    .then(rawData => {
      const count = R.prop('total')(rawData);
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
