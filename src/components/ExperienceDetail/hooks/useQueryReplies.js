import { useAsyncFn } from 'react-use';

import { queryExperienceReplies } from 'apis/experiencesApi';
import { useToken } from 'hooks/auth';

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
