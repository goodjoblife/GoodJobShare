import { useCallback } from 'react';

import createExperienceLikeApi from 'apis/createExperienceLike';
import deleteExperienceLikesApi from 'apis/deleteExperienceLike';
import { useToken } from 'hooks/auth';

const useToggleLike = (
  experienceId: string,
): ((liked: boolean) => Promise<void>) => {
  const token = useToken();
  return useCallback(
    async (liked: boolean): Promise<void> => {
      if (liked) {
        await deleteExperienceLikesApi({
          id: experienceId,
          token,
        });
      } else {
        await createExperienceLikeApi({
          id: experienceId,
          token,
        });
      }
    },
    [experienceId, token],
  );
};

export default useToggleLike;
