import R from 'ramda';
import { fetchTimeAndSalary } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_COUNT_DATA = '@@TIME_AND_SALARY/SET_COUNT_DATA';

const setCountData = (count, status, error = null) => ({
  type: SET_COUNT_DATA,
  count,
  status,
  error,
});

export const queryTimeAndSalaryCount = () =>
  dispatch => {
    const opt = {
      limit: 1,
    };

    return fetchTimeAndSalary(opt)
      .then(rawData => {
        const count = R.prop('total')(rawData);
        dispatch(setCountData(count, fetchingStatus.FETCHED));
      }).catch(error => {
        dispatch(setCountData(0, fetchingStatus.ERROR, error));
      });
  };
