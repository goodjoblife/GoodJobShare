import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import {
  SET_BOARD_DATA,
  SET_BOARD_STATUS,
  SET_BOARD_EXTREME_DATA,
  SET_BOARD_EXTREME_STATUS,
} from '../actions/timeAndSalaryBoard';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  sortBy: null,
  order: null,
  data: [],
  total: 0,
  currentPage: 0,
  status: fetchingStatus.UNFETCHED,
  error: null,
  extremeData: [],
  extremeStatus: fetchingStatus.UNFETCHED,
  extremeError: null,
});

export default createReducer(preloadedState, {
  [SET_BOARD_DATA]: (
    state,
    { sortBy, order, data, total, currentPage, status, error }
  ) =>
    state
      .set('data', fromJS(data))
      .set('total', total)
      .set('currentPage', currentPage)
      .set('status', status)
      .set('error', error)
      .set('sortBy', sortBy)
      .set('order', order),
  [SET_BOARD_STATUS]: (state, { status }) => state.set('status', status),
  [SET_BOARD_EXTREME_DATA]: (
    state,
    { extremeData, extremeStatus, extremeError }
  ) =>
    state
      .set('extremeData', fromJS(extremeData))
      .set('extremeStatus', extremeStatus)
      .set('extremeError', extremeError),
  [SET_BOARD_EXTREME_STATUS]: (state, { extremeStatus }) =>
    state.set('extremeStatus', extremeStatus),
});
