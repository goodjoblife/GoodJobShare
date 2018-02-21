import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_COUNT_DATA } from '../actions/experiences';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  count: 0,
  countStatus: fetchingStatus.UNFETCHED,
  countError: null,
});

export default createReducer(preloadedState, {
  [SET_COUNT_DATA]: (state, { count, status, error }) =>
    state
      .set('count', count)
      .set('countStatus', status)
      .set('countError', error),
});
