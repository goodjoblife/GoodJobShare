import { useAsyncFn } from 'react-use';

import { queryExperienceLike } from 'apis/experiencesApi';
import { useToken } from 'hooks/auth';

const useQueryLike = experienceId => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLike({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLike;
