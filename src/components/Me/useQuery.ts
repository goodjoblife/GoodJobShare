import { useCallback, useState } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import queryMyPublishes from 'apis/queryMyPublishes';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

type MyPublishes = Awaited<ReturnType<typeof queryMyPublishes>>;

type Publishable = { id: string; status: 'published' | 'hidden' };

export const useFetchMyPublishesBox = (): readonly [
  FetchBox<MyPublishes>,
  () => Promise<void>,
] => {
  const token = useToken();

  const [box, setBox] = useState<FetchBox<MyPublishes>>(getUnfetched());

  const callback = useCallback(async () => {
    setBox(prevBox => toFetching(prevBox));
    try {
      const data = await queryMyPublishes({ token });
      setBox(getFetched(data));
    } catch (error) {
      setBox(getError(error));
    }
  }, [token]);

  return [box, callback] as const;
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
