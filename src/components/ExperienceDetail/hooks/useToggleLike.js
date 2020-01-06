import { useCallback } from 'react';
import useToken from 'hooks/useToken';
import api from '../../../apis';

const useToggleLike = experienceId => {
  const token = useToken();
  return useCallback(
    liked => {
      if (liked) {
        return api.experiences.deleteExperienceLikes({
          id: experienceId,
          token,
        });
      } else {
        return api.experiences.postExperienceLikes({
          id: experienceId,
          token,
        });
      }
    },
    [experienceId, token],
  );
};

export default useToggleLike;
