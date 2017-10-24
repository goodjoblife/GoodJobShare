import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_BOARD_DATA, SET_BOARD_STATUS } from '../actions/timeAndSalaryBoard';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  soryBy: null,
  order: null,
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_BOARD_DATA]: (state, { sortBy, order, data, status, error }) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('sortBy', sortBy)
      .set('order', order),
  [SET_BOARD_STATUS]: (state, { status }) =>
    state.set('status', status),
});
