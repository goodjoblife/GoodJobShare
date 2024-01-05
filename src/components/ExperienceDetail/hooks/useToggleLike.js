import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import {
  deleteExperienceLikes as deleteExperienceLikesApi,
  postExperienceLikes as postExperienceLikesApi,
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
        return postExperienceLikesApi({
          id: experienceId,
          token,
        });
      }
    },
    [experienceId, token],
  );
};

export default useToggleLike;
