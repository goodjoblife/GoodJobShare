import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskAndRewardUnfetched } from '../actions/taskAndReward';
import {
  rewardsSelector,
  tasksSelector,
  hasFetchedSelector,
} from '../selectors/taskAndRewardSelector';

export default () => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  const rewards = useSelector(rewardsSelector);
  const fetched = useSelector(hasFetchedSelector);

  useEffect(() => {
    dispatch(fetchTaskAndRewardUnfetched());
  }, [dispatch]);

  return { tasks, rewards, fetched };
};
