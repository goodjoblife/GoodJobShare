import { useAsyncFn } from 'react-use';
import { AsyncFn } from 'react-use/lib/useAsyncFn';

import queryExperienceLike from 'apis/queryExperienceLike';
import { useToken } from 'hooks/auth';

const useQueryLike = (experienceId: string): AsyncFn<boolean> => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLike({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLike;
