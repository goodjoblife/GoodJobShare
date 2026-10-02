import { useAsyncFn } from 'react-use';
import { AsyncFn } from 'react-use/lib/useAsyncFn';

import queryExperienceLiked from 'apis/queryExperienceLiked';
import { useToken } from 'hooks/auth';

const useQueryLiked = (experienceId: string): AsyncFn<boolean> => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLiked({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLiked;
