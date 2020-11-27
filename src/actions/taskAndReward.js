import fetchingStatus, { isUnfetched } from '../constants/status';

export const SET_TASK_AND_REWARD = '@@taskAndReward/SET_TASK_AND_REWARD';

const setTaskAndReward = ({ rewards, tasks, status, error = null }) => ({
  type: SET_TASK_AND_REWARD,
  rewards,
  tasks,
  status,
  error,
});

export const fetchTaskAndRewardUnfetched = () => (
  dispatch,
  getState,
  { api },
) => {
  if (isUnfetched(getState().taskAndReward.get('status'))) {
    dispatch(setTaskAndReward({ status: fetchingStatus.FETCHING }));
    return api.taskAndReward
      .getTaskAndReward()
      .then(rawData => {
        dispatch(
          setTaskAndReward({
            status: fetchingStatus.FETCHED,
            tasks: rawData.tasks,
            rewards: rawData.rewards,
          }),
        );
      })
      .catch(error => {
        dispatch(setTaskAndReward({ status: fetchingStatus.ERROR, error }));
      });
  }
  return Promise.resolve();
};
