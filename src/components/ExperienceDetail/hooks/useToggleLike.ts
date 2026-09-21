import { useCallback } from 'react';

import createExperienceLikeApi from 'apis/createExperienceLike';
import deleteExperienceLikesApi from 'apis/deleteExperienceLike';
import { useToken } from 'hooks/auth';

type ToggleLikeResult =
  | ReturnType<typeof createExperienceLikeApi>
  | ReturnType<typeof deleteExperienceLikesApi>;

const useToggleLike = (
  experienceId: string,
): ((liked: boolean) => ToggleLikeResult) => {
  const token = useToken();
  return useCallback(
    (liked: boolean): ToggleLikeResult => {
      if (liked) {
        return deleteExperienceLikesApi({
          id: experienceId,
          token,
        });
      } else {
        return createExperienceLikeApi({
          id: experienceId,
          token,
        });
      }
    },
    [experienceId, token],
  );
};

export default useToggleLike;
