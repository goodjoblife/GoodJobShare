import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { queryExperienceReplies } from 'apis/experiencesApi';

const useQueryReplies = experienceId => {
  const token = useToken();
  return useAsyncFn(
    () =>
      queryExperienceReplies({
        id: experienceId,
        token,
      }),
    [experienceId, token],
  );
};

export default useQueryReplies;
