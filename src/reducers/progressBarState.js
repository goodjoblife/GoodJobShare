import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_PROGRESS_BAR_STATE } from '../actions/progressBar';

const preloadedState = fromJS({
  experienceCount: 0,
  hasFetched: false,
  error: null,
});

export default createReducer(preloadedState, {
  [SET_PROGRESS_BAR_STATE]: (state, { experienceCount, hasFetched, error }) =>
    state
      .set('experienceCount', experienceCount)
      .set('hasFetched', hasFetched)
      .set('error', error),
});
