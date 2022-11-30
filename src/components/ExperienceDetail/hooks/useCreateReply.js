import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import api from '../../../apis';

const useCreateReply = experienceId => {
  const token = useToken();
  return useCallback(
    comment =>
      api.experiences.postExperienceReply({
        id: experienceId,
        comment,
        token,
      }),
    [experienceId, token],
  );
};

export default useCreateReply;
