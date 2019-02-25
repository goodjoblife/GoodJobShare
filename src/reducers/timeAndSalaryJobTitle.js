import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import {
  SET_JOB_TITLE,
  SET_STATUS,
  SET_PAGE,
} from '../actions/timeAndSalaryJobTitle';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  jobTitle: null,
  page: 1,
  pageSize: 10,
  data: null,
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_JOB_TITLE]: (state, { jobTitle, data, status, error }) =>
    state
      .set('data', fromJS(data))
      .set('status', status)
      .set('error', error)
      .set('jobTitle', jobTitle),
  [SET_PAGE]: (state, { page, pageSize }) =>
    state.set('page', page).set('pageSize', pageSize),
  [SET_STATUS]: (state, { status }) => state.set('status', status),
});
