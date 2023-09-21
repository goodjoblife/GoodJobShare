import createReducer from 'utils/createReducer';

import {
  SET_BOARD_DATA,
  SET_BOARD_STATUS,
  SET_BOARD_EXTREME_DATA,
  SET_BOARD_EXTREME_STATUS,
} from 'actions/timeAndSalaryBoard';
import fetchingStatus from 'constants/status';

const preloadedState = {
  data: [],
  total: 0,
  currentPage: 0,
  status: fetchingStatus.UNFETCHED,
  error: null,
  extremeData: [],
  extremeStatus: fetchingStatus.UNFETCHED,
  extremeError: null,
};

export default createReducer(preloadedState, {
  [SET_BOARD_DATA]: (state, { data, total, currentPage, status, error }) => ({
    ...state,
    data,
    total,
    currentPage,
    status,
    error,
  }),
  [SET_BOARD_STATUS]: (state, { status }) => ({
    ...state,
    status,
  }),
  [SET_BOARD_EXTREME_DATA]: (
    state,
    { extremeData, extremeStatus, extremeError },
  ) => ({
    ...state,
    extremeData,
    extremeStatus,
    extremeError,
  }),
  [SET_BOARD_EXTREME_STATUS]: (state, { extremeStatus }) => ({
    ...state,
    extremeStatus,
  }),
});
