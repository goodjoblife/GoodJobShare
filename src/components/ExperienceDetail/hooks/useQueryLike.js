import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { queryExperienceLike } from 'apis/experiencesApi';

const useQueryLike = experienceId => {
  const token = useToken();
  return useAsyncFn(() => queryExperienceLike({ id: experienceId, token }), [
    experienceId,
    token,
  ]);
};

export default useQueryLike;
