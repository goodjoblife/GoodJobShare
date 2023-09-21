import R from 'ramda';

import fetchingStatus from '../constants/status';
import { DATA_NUM_PER_PAGE } from '../constants/timeAndSalarSearch';

export const SET_BOARD_DATA = '@@timeAndSalary/SET_BOARD_DATA';
export const SET_BOARD_STATUS = '@@timeAndSalary/SET_BOARD_STATUS';
export const SET_BOARD_EXTREME_DATA = '@@timeAndSalary/SET_BOARD_EXTREME_DATA';
export const SET_BOARD_EXTREME_STATUS =
  '@@timeAndSalary/SET_BOARD_EXTREME_STATUS';

const sortBySelector = state => state.timeAndSalaryBoard.sortBy;
const orderSelector = state => state.timeAndSalaryBoard.order;
const pageSelector = state => state.timeAndSalaryBoard.currentPage;
const statusSelector = state => state.timeAndSalaryBoard.status;
const extremeStatusSelector = state => state.timeAndSalaryBoard.extremeStatus;

const resetBoard = ({ page }) => ({
  type: SET_BOARD_DATA,
  status: fetchingStatus.UNFETCHED,
  data: [],
  total: 0,
  currentPage: page,
  error: null,
});

const setBoardData = ({
  status,
  data,
  total = 0,
  currentPage = 0,
  error = null,
}) => (dispatch, getState) => {
  // make sure the store is consistent
  if (currentPage !== pageSelector(getState())) {
    return;
  }
  dispatch({
    type: SET_BOARD_DATA,
    status,
    data,
    total,
    currentPage,
    error,
  });
};

export const queryTimeAndSalary = ({ page }) => (
  dispatch,
  getState,
  { api },
) => {
  if (page !== pageSelector(getState())) {
    dispatch(resetBoard({ page }));
  }

  if (statusSelector(getState()) === fetchingStatus.FETCHING) {
    return Promise.resolve();
  }

  dispatch({
    type: SET_BOARD_STATUS,
    status: fetchingStatus.FETCHING,
  });

  const start = (page - 1) * DATA_NUM_PER_PAGE;
  const limit = DATA_NUM_PER_PAGE;

  return api.timeAndSalary
    .fetchTimeAndSalary({ start, limit })
    .then(rawData => {
      const { salary_work_time_count, salary_work_times } = rawData;
      // 將Array公司名稱轉換成String
      const takeFirstFromArrayCompanyName = R.over(
        R.lensPath(['company', 'name']),
        R.ifElse(
          R.pipe(
            R.type,
            R.equals('Array'),
          ),
          R.head,
          R.identity,
        ),
      );
      const data = salary_work_times.map(takeFirstFromArrayCompanyName);

      dispatch(
        setBoardData({
          status: fetchingStatus.FETCHED,
          data,
          total: salary_work_time_count,
          currentPage: page,
        }),
      );
    })
    .catch(error => {
      dispatch(
        setBoardData({
          status: fetchingStatus.ERROR,
          data: [],
          error,
          currentPage: page,
        }),
      );
    });
};

export const resetBoardExtremeData = () => ({
  type: SET_BOARD_EXTREME_DATA,
  extremeStatus: fetchingStatus.UNFETCHED,
  extremeData: [],
  extremeError: null,
});

const setBoardExtremeData = (
  { sortBy, order },
  { extremeStatus, extremeData, extremeError = null },
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

export const queryExtremeTimeAndSalary = () => (
  dispatch,
  getState,
  { api },
) => {
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

  return api.timeAndSalary
    .fetchTimeAndSalaryExtreme({ opt })
    .then(rawData => {
      // 將Array公司名稱轉換成String
      const takeFirstFromArrayCompanyName = R.over(
        R.lensPath(['company', 'name']),
        R.when(
          R.pipe(
            R.type,
            R.equals('Array'),
          ),
          R.head,
        ),
      );
      const extremeData = rawData.time_and_salary.map(
        takeFirstFromArrayCompanyName,
      );

      dispatch(
        setBoardExtremeData(
          { sortBy, order },
          { extremeStatus: fetchingStatus.FETCHED, extremeData },
        ),
      );
    })
    .catch(extremeError => {
      dispatch(
        setBoardExtremeData(
          { sortBy, order },
          {
            extremeStatus: fetchingStatus.ERROR,
            extremeData: [],
            extremeError,
          },
        ),
      );
    });
};
