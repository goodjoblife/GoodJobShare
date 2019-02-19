import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import {
  SET_SEARCH_DATA,
  SET_SEARCH_STATUS,
} from '../actions/timeAndSalarySearch';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  groupSortBy: null,
  order: null,
  searchBy: null,
  keyword: null,
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_SEARCH_DATA]: (
    state,
    { groupSortBy, order, searchBy, keyword, data, status, error },
  ) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('groupSortBy', groupSortBy)
      .set('order', order)
      .set('searchBy', searchBy)
      .set('keyword', keyword),
  [SET_SEARCH_STATUS]: (state, { status }) => state.set('status', status),
});
