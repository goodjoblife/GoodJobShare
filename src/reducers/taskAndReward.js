import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_TASK_AND_REWARD } from '../actions/taskAndReward';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  tasks: [],
  rewards: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(
  preloadedState,
  {
    [SET_TASK_AND_REWARD]: (state, { tasks, rewards, status, error }) =>
      state
        .set('tasks', tasks)
        .set('rewards', rewards)
        .set('status', status)
        .set('error', error),
  },
  { resetOnLogOut: false },
);
