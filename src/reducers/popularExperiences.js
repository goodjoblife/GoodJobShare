import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_DATA, SET_STATUS } from '../actions/popularExperiences';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  data: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(
  preloadedState,
  {
    [SET_DATA]: (state, { data, status, error }) =>
      state
        .set('data', fromJS(data))
        .set('status', status)
        .set('error', error),
    [SET_STATUS]: (state, { status }) => state.set('status', status),
  },
  { resetOnLogOut: false },
);
