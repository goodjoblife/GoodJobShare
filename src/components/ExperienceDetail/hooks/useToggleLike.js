import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import {
  deleteExperienceLikesApi,
  createExperienceLikeApi,
} from 'apis/experiencesApi';

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
