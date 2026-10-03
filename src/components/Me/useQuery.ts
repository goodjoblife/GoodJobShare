import { useCallback } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import changeSalaryWorkTimeStatus from 'apis/changeSalaryWorkTimeStatus';
import queryMyPublishes from 'apis/queryMyPublishes';
import { useToken } from 'hooks/auth';
import useAsyncBoxFn from 'hooks/useAsyncBoxFn';
import FetchBox from 'utils/fetchBox';

type MyPublishes = Awaited<ReturnType<typeof queryMyPublishes>>;

type Publishable = { id: string; status: 'published' | 'hidden' };

export const useFetchMyPublishesBox = (): readonly [
  FetchBox<MyPublishes>,
  () => Promise<void>,
] => {
  const token = useToken();

  return useAsyncBoxFn(() => queryMyPublishes({ token }), [token]);
};

export const useToggleExperienceStatus = (): ((
  o: Publishable,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: Publishable) => {
      return changeExperienceStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleSalaryWorkTimeStatus = (): ((
  o: Publishable,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: Publishable) => {
      return changeSalaryWorkTimeStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleReplyStatus = (): ((
  o: Publishable,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: Publishable) => {
      return changeReplyStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
