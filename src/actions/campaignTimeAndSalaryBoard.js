import R from 'ramda';
import { push } from 'react-router-redux';

import { fetchTimeAndSalary, fetchTimeAndSalaryExtreme } from '../apis/timeAndSalaryApi';
import fetchingStatus from '../constants/status';

export const SET_BOARD_DATA = '@@campaignTimeAndSalary/SET_BOARD_DATA';
export const SET_BOARD_STATUS = '@@campaignTimeAndSalary/SET_BOARD_STATUS';
export const SET_BOARD_EXTREME_DATA = '@@campaignTimeAndSalary/SET_BOARD_EXTREME_DATA';
export const SET_BOARD_EXTREME_STATUS = '@@campaignTimeAndSalary/SET_BOARD_EXTREME_STATUS';

const campaignNameSelector = state => state.campaignTimeAndSalaryBoard.get('campaignName');
const sortBySelector = state => state.campaignTimeAndSalaryBoard.get('sortBy');
const orderSelector = state => state.campaignTimeAndSalaryBoard.get('order');
const dataSelector = state => state.campaignTimeAndSalaryBoard.get('data');
const statusSelector = state => state.campaignTimeAndSalaryBoard.get('status');
const extremeStatusSelector = state => state.campaignTimeAndSalaryBoard.get('extremeStatus');

const resetBoard = ({ campaignName, sortBy, order }) => ({
  type: SET_BOARD_DATA,
  campaignName,
  sortBy,
  order,
  status: fetchingStatus.UNFETCHED,
  data: [],
  error: null,
});

const setBoardData = ({ campaignName, sortBy, order }, { status, data, error = null }) =>
  (dispatch, getState) => {
    // make sure the store is consistent
    if (campaignName !== campaignNameSelector(getState()) || sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      return;
    }
    dispatch({
      type: SET_BOARD_DATA,
      campaignName,
      sortBy,
      order,
      status,
      data,
      error,
    });
  };

export const queryCampaignTimeAndSalary = ({ campaignName, sortBy, order }) =>
  (dispatch, getState) => {
    if (campaignName !== campaignNameSelector(getState()) || sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      dispatch(resetBoard({ campaignName, sortBy, order }));
      dispatch(resetBoardExtremeData()); // eslint-disable-line no-use-before-define
    }

    if (statusSelector(getState()) === fetchingStatus.FETCHING) {
      return Promise.resolve();
    }

    dispatch({
      type: SET_BOARD_STATUS,
      status: fetchingStatus.FETCHING,
    });

    const opt = {
      campaign: campaignName,
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
        dispatch(setBoardData({ campaignName, sortBy, order }, { status: fetchingStatus.FETCHED, data: nextData }));
      })
      .catch(error => {
        dispatch(setBoardData({ campaignName, sortBy, order }, { status: fetchingStatus.ERROR, data: [], error }));
      });
  };

export const switchPath = path =>
  dispatch =>
    dispatch(push(path));

export const resetBoardExtremeData = () => ({
  type: SET_BOARD_EXTREME_DATA,
  extremeStatus: fetchingStatus.UNFETCHED,
  extremeData: [],
  extremeError: null,
});

const setBoardExtremeData = ({ campaignName, sortBy, order }, { extremeStatus, extremeData, extremeError = null }) =>
  (dispatch, getState) => {
    // make sure the store is consistent
    if (campaignName !== campaignNameSelector(getState()) || sortBy !== sortBySelector(getState()) || order !== orderSelector(getState())) {
      return;
    }
    dispatch({
      type: SET_BOARD_EXTREME_DATA,
      extremeStatus,
      extremeData,
      extremeError,
    });
  };

export const queryExtremeCampaignTimeAndSalary = ({ campaignName }) =>
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
      campaign: campaignName,
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

        dispatch(setBoardExtremeData({ campaignName, sortBy, order }, { extremeStatus: fetchingStatus.FETCHED, extremeData }));
      })
      .catch(extremeError => {
        dispatch(setBoardExtremeData({ campaignName, sortBy, order }, { extremeStatus: fetchingStatus.ERROR, extremeData: [], extremeError }));
      });
  };
