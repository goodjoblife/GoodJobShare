import { useCallback } from 'react';

import {
  createExperienceLikeApi,
  deleteExperienceLikesApi,
} from 'apis/experiencesApi';
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
