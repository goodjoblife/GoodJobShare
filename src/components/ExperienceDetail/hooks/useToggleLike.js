import { useCallback } from 'react';

import createExperienceLikeApi from 'apis/createExperienceLike';
import deleteExperienceLikesApi from 'apis/deleteExperienceLike';
import { useToken } from 'hooks/auth';

const useToggleLike = experienceId => {
  const token = useToken();
  return useCallback(
    liked => {
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
