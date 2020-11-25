import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import api from '../../apis';

export const useFetchMyUnlockedContents = () => {
  const token = useToken();

  const [state, callback] = useAsyncFn(
    () => api.me.getMyUnlockedContents({ token }),
    [token],
  );

  return [state, callback];
};
