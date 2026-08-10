import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';

import {
  changeExperienceStatus,
  patchReply as patchReplyApi,
} from 'apis/experiencesApi';
import { queryMyPublishesApi } from 'apis/me';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';

export const useFetchMyPublishes = () => {
  const token = useToken();

  const [state, callback] = useAsyncFn(() => queryMyPublishesApi({ token }), [
    token,
  ]);

  return [state, callback];
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
      return patchReplyApi({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
