import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { getExperienceReply as getExperienceReplyApi } from 'apis/experiencesApi';

const useQueryReplies = experienceId => {
  const token = useToken();
  return useAsyncFn(async () => {
    const result = await getExperienceReplyApi({
      experienceId,
      start: 0,
      limit: 100,
      token,
    });

    return result.replies;
  }, [experienceId, token]);
};

export default useQueryReplies;
