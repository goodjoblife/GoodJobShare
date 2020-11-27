import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useToken } from 'hooks/auth';
import { fetchMyUnlockedContentsAndPointsIfUnfetched } from '../actions/permission';
import { rewardToApiMap } from '../constants/taskAndReward';

const useHandleUnlockData = ({ reward, dataId }) => {
  const token = useToken();
  const dispatch = useDispatch();

  return useCallback(async () => {
    if (reward) {
      const api = rewardToApiMap[reward.id];
      await api({ token, id: dataId });
      dispatch(
        fetchMyUnlockedContentsAndPointsIfUnfetched({ forceFetch: true }),
      );
    }
  }, [dataId, dispatch, reward, token]);
};

export default useHandleUnlockData;
