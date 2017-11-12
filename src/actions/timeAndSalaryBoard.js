import R from 'ramda';
import { push } from 'react-router-redux';

import { fetchTimeAndSalary, fetchTimeAndSalaryExtreme } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_BOARD_DATA = '@@timeAndSalary/SET_BOARD_DATA';
export const SET_BOARD_STATUS = '@@timeAndSalary/SET_BOARD_STATUS';
export const SET_BOARD_EXTREME_DATA = '@@timeAndSalary/SET_BOARD_EXTREME_DATA';
export const SET_BOARD_EXTREME_STATUS = '@@timeAndSalary/SET_BOARD_EXTREME_STATUS';

const sortBySelector = state => state.timeAndSalaryBoard.get('sortBy');
const orderSelector = state => state.timeAndSalaryBoard.get('order');
const dataSelector = state => state.timeAndSalaryBoard.get('data');
const statusSelector = state => state.timeAndSalaryBoard.get('status');
const extremeStatusSelector = state => state.timeAndSalaryBoard.get('extremeStatus');

const resetBoard = ({ sortBy, order }) => ({
  type: SET_BOARD_DATA,
  sortBy,
  order,
  status: fetchingStatus.UNFETCHED,
  data: [],
  error: null,
});

const setBoardData = ({ sortBy, order }, { status, data, error = null }) =>
  (dispatch, getState) => {
    // make sure the store is consistent
    if (sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      return;
    }
    dispatch({
      type: SET_BOARD_DATA,
      sortBy,
      order,
      status,
      data,
      error,
    });
  };

export const queryTimeAndSalary = ({ sortBy, order }) =>
  (dispatch, getState) => {
    if (sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      dispatch(resetBoard({ sortBy, order }));
    }

    if (statusSelector(getState()) === fetchingStatus.FETCHING) {
      return Promise.resolve();
    }

    dispatch({
      type: SET_BOARD_STATUS,
      status: fetchingStatus.FETCHING,
    });

    const opt = {
      sort_by: sortBy,
      order,
      page: Math.ceil(dataSelector(getState()).size / 25),
      limit: 25,
      skip: (sortBy !== 'created_at').toString(),
    };

    return fetchTimeAndSalary(opt)
      .then(rawData => {
        // 將Array公司名稱轉換成String
        const takeFirstFromArrayCompanyName =
          R.over(
            R.lensPath(['company', 'name']),
            R.ifElse(
              R.pipe(R.type, R.equals('Array')),
              R.head,
              R.identity,
            ),
          );
        const data =
          rawData.time_and_salary.map(
            takeFirstFromArrayCompanyName,
          );

        const currentData = dataSelector(getState()).toJS();
        const nextData = currentData.concat(data);
        dispatch(setBoardData({ sortBy, order }, { status: fetchingStatus.FETCHED, data: nextData }));
      })
      .catch(error => {
        dispatch(setBoardData({ sortBy, order }, { status: fetchingStatus.ERROR, data: [], error }));
      });
  };

export const switchPath = path =>
  dispatch =>
    dispatch(push(`/time-and-salary/${path}`));

const setBoardExtremeData = ({ sortBy, order }, { extremeStatus, extremeData, extremeError = null }) =>
  (dispatch, getState) => {
    // make sure the store is consistent
    if (sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      return;
    }
    dispatch({
      type: SET_BOARD_EXTREME_DATA,
      extremeStatus,
      extremeData,
      extremeError,
    });
  };

export const queryExtremeTimeAndSalary = () =>
  (dispatch, getState) => {
    // extreme data only available for data sorted by estimated_hourly_wage and week_work_time
    if (sortBySelector(getState()) !== 'estimated_hourly_wage' && sortBySelector(getState()) !== 'week_work_time') {
      return Promise.resolve();
    }
    if (extremeStatusSelector(getState()) === fetchingStatus.FETCHED) {
      return Promise.resolve();
    }
    dispatch({
      type: SET_BOARD_EXTREME_STATUS,
      extremeStatus: fetchingStatus.FETCHING,
    });

    const sortBy = sortBySelector(getState());
    const order = orderSelector(getState());
    const opt = {
      sort_by: sortBy,
      order,
    };

    return fetchTimeAndSalaryExtreme(opt)
      .then(rawData => {
        // 將Array公司名稱轉換成String
        const takeFirstFromArrayCompanyName =
          R.over(
            R.lensPath(['company', 'name']),
            R.when(
              R.pipe(R.type, R.equals('Array')),
              R.head,
            ),
          );
        const extremeData =
          rawData.time_and_salary.map(
            takeFirstFromArrayCompanyName,
          );

        dispatch(setBoardExtremeData({ sortBy, order }, { extremeStatus: fetchingStatus.FETCHED, extremeData }));
      })
      .catch(error => {
        dispatch(setBoardExtremeData({ sortBy, order }, { extremeStatus: fetchingStatus.ERROR, extremeData: [], error }));
      });
  };
