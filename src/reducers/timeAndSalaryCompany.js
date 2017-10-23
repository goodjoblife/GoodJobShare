import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_COMPANY_DATA, SET_COMPANY_STATUS } from '../actions/timeAndSalaryCompany';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  groupSortBy: null,
  order: null,
  company: null,
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_COMPANY_DATA]: (state, { groupSortBy, order, company, data, status, error }) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('groupSortBy', groupSortBy)
      .set('order', order)
      .set('company', company),
  [SET_COMPANY_STATUS]: (state, { status }) =>
    state.set('status', status),
});
