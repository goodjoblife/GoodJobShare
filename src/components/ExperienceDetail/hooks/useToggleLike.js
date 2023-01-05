import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import experiencesApi from 'apis/experiencesApi';

const useToggleLike = experienceId => {
  const token = useToken();
  return useCallback(
    liked => {
      if (liked) {
        return experiencesApi.deleteExperienceLikes({
          id: experienceId,
          token,
        });
      } else {
        return experiencesApi.postExperienceLikes({
          id: experienceId,
          token,
        });
      }
    },
    [experienceId, token],
  );
};

export default useToggleLike;
