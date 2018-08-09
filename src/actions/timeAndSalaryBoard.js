import R from 'ramda';
import { push } from 'react-router-redux';

import {
  fetchTimeAndSalary,
  fetchTimeAndSalaryExtreme,
} from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';
import { DATA_NUM_PER_PAGE } from '../constants/timeAndSalarSearch';

export const SET_BOARD_DATA = '@@timeAndSalary/SET_BOARD_DATA';
export const SET_BOARD_STATUS = '@@timeAndSalary/SET_BOARD_STATUS';
export const SET_BOARD_EXTREME_DATA = '@@timeAndSalary/SET_BOARD_EXTREME_DATA';
export const SET_BOARD_EXTREME_STATUS =
  '@@timeAndSalary/SET_BOARD_EXTREME_STATUS';

const sortBySelector = state => state.timeAndSalaryBoard.get('sortBy');
const orderSelector = state => state.timeAndSalaryBoard.get('order');
const pageSelector = state => state.timeAndSalaryBoard.get('currentPage');
const statusSelector = state => state.timeAndSalaryBoard.get('status');
const extremeStatusSelector = state =>
  state.timeAndSalaryBoard.get('extremeStatus');

const resetBoard = ({ sortBy, order, page }) => ({
  type: SET_BOARD_DATA,
  sortBy,
  order,
  status: fetchingStatus.UNFETCHED,
  data: [],
  total: 0,
  currentPage: page,
  error: null,
});

const setBoardData = (
  { sortBy, order },
  { status, data, total = 0, currentPage = 0, error = null }
) => (dispatch, getState) => {
  // make sure the store is consistent
  if (
    sortBy !== sortBySelector(getState()) ||
    order !== orderSelector(getState()) ||
    currentPage !== pageSelector(getState())
  ) {
    return;
  }
  dispatch({
    type: SET_BOARD_DATA,
    sortBy,
    order,
    status,
    data,
    total,
    currentPage,
    error,
  });
};

export const queryTimeAndSalary = ({ sortBy, order, page }) => (
  dispatch,
  getState
) => {
  if (
    sortBy !== sortBySelector(getState()) ||
    order !== orderSelector(getState()) ||
    page !== pageSelector(getState())
  ) {
    dispatch(resetBoard({ sortBy, order, page }));
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
    page: page - 1,
    limit: DATA_NUM_PER_PAGE,
    skip: (sortBy !== 'created_at').toString(),
  };

  return fetchTimeAndSalary(opt)
    .then(rawData => {
      // 將Array公司名稱轉換成String
      const takeFirstFromArrayCompanyName = R.over(
        R.lensPath(['company', 'name']),
        R.ifElse(
          R.pipe(
            R.type,
            R.equals('Array')
          ),
          R.head,
          R.identity
        )
      );
      const data = rawData.time_and_salary.map(takeFirstFromArrayCompanyName);

      dispatch(
        setBoardData(
          { sortBy, order },
          {
            status: fetchingStatus.FETCHED,
            data,
            total: rawData.total,
            currentPage: page,
          }
        )
      );
    })
    .catch(error => {
      dispatch(
        setBoardData(
          { sortBy, order },
          { status: fetchingStatus.ERROR, data: [], error }
        )
      );
    });
};

export const switchPath = path => dispatch => dispatch(push(path));

export const resetBoardExtremeData = () => ({
  type: SET_BOARD_EXTREME_DATA,
  extremeStatus: fetchingStatus.UNFETCHED,
  extremeData: [],
  extremeError: null,
});

const setBoardExtremeData = (
  { sortBy, order },
  { extremeStatus, extremeData, extremeError = null }
) => (dispatch, getState) => {
  // make sure the store is consistent
  if (
    sortBy !== sortBySelector(getState()) ||
    order !== orderSelector(getState())
  ) {
    return;
  }
  dispatch({
    type: SET_BOARD_EXTREME_DATA,
    extremeStatus,
    extremeData,
    extremeError,
  });
};

export const queryExtremeTimeAndSalary = () => (dispatch, getState) => {
  // extreme data only available for data sorted by estimated_hourly_wage and week_work_time
  if (
    sortBySelector(getState()) !== 'estimated_hourly_wage' &&
    sortBySelector(getState()) !== 'week_work_time'
  ) {
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
      const takeFirstFromArrayCompanyName = R.over(
        R.lensPath(['company', 'name']),
        R.when(
          R.pipe(
            R.type,
            R.equals('Array')
          ),
          R.head
        )
      );
      const extremeData = rawData.time_and_salary.map(
        takeFirstFromArrayCompanyName
      );

      dispatch(
        setBoardExtremeData(
          { sortBy, order },
          { extremeStatus: fetchingStatus.FETCHED, extremeData }
        )
      );
    })
    .catch(extremeError => {
      dispatch(
        setBoardExtremeData(
          { sortBy, order },
          { extremeStatus: fetchingStatus.ERROR, extremeData: [], extremeError }
        )
      );
    });
};
