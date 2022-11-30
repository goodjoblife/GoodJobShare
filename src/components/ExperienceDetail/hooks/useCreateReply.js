import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import api from '../../../apis';

const useCreateReply = experienceId => {
  const token = useToken();
  return useAsyncFn(
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
