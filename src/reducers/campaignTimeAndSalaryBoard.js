import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_BOARD_DATA, SET_BOARD_STATUS } from '../actions/campaignTimeAndSalaryBoard';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  campaignName: '',
  sortBy: null,
  order: null,
  data: [],
  total: 0,
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_BOARD_DATA]: (state, { campaignName, sortBy, order, data, total, status, error }) =>
    state
      .set('campaignName', campaignName)
      .set('data', fromJS(data))
      .set('total', total)
      .set('status', status)
      .set('error', error)
      .set('sortBy', sortBy)
      .set('order', order),
  [SET_BOARD_STATUS]: (state, { status }) =>
    state.set('status', status),
});
