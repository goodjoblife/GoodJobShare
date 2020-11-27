import R from 'ramda';
import { isFetched } from '../constants/status';

export const rewardsSelector = state => state.taskAndReward.get('rewards');

export const tasksSelector = state => state.taskAndReward.get('tasks');

export const hasFetchedSelector = R.compose(
  isFetched,
  state => state.taskAndReward.get('status'),
);
