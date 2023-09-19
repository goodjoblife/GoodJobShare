import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import api from '../../../apis';

const useQueryReplies = experienceId => {
  const token = useToken();
  return useAsyncFn(async () => {
    const result = await api.experiences.getExperienceReply({
      experienceId,
      start: 0,
      limit: 100,
      token,
    });

    return result.replies;
  }, [experienceId, token]);
};

export default useQueryReplies;
