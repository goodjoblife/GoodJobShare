import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_COMPANY, SET_STATUS } from '../actions/timeAndSalaryCompany';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  companyName: null,
  data: null,
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_COMPANY]: (state, { companyName, data, status, error }) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('companyName', companyName),
  [SET_STATUS]: (state, { status }) => state.set('status', status),
});
