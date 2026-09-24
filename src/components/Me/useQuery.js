import { useCallback, useState } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import { queryMyPublishesApi } from 'apis/me';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';
import { getError, getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

export const useFetchMyPublishesBox = () => {
  const token = useToken();

  const [box, setBox] = useState(getUnfetched());

  const callback = useCallback(async () => {
    setBox(prevBox => toFetching(prevBox));
    try {
      const data = await queryMyPublishesApi({ token });
      setBox(getFetched(data));
    } catch (error) {
      setBox(getError(error));
    }
  }, [token]);

  return [box, callback];
};

export const useToggleExperienceStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return changeExperienceStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleSalaryWorkTimeStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return changeSalaryWorkTimeStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleReplyStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return changeReplyStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
