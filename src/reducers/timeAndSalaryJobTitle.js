import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import {
  SET_JOB_TITLE_DATA,
  SET_JOB_TITLE_STATUS,
} from '../actions/timeAndSalaryJobTitle';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  groupSortBy: null,
  order: null,
  jobTitle: null,
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_JOB_TITLE_DATA]: (
    state,
    { groupSortBy, order, jobTitle, data, status, error }
  ) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('groupSortBy', groupSortBy)
      .set('order', order)
      .set('jobTitle', jobTitle),
  [SET_JOB_TITLE_STATUS]: (state, { status }) => state.set('status', status),
});
