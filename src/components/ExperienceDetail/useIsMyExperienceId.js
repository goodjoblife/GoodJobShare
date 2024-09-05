import { useCallback, useEffect } from 'react';
import { queryMyExperienceIdsApi } from 'apis/me';
import { useToken } from 'hooks/auth';
import { useAsyncFn } from 'react-use';

const useIsMyExperienceId = () => {
  const token = useToken();

  const [{ value: myExperienceIds }, fetchMyExperienceIds] = useAsyncFn(
    () =>
      queryMyExperienceIdsApi({
        token,
      }),
    [token],
  );

  useEffect(() => {
    fetchMyExperienceIds();
  }, [fetchMyExperienceIds]);

  const isMyExperienceId = useCallback(
    experienceId => {
      if (!myExperienceIds) return false;
      return myExperienceIds.includes(experienceId);
    },
    [myExperienceIds],
  );

  return isMyExperienceId;
};

export default useIsMyExperienceId;
