import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { queryMyPublishesApi } from 'apis/me';
import {
  patchReply as patchReplyApi,
  changeExperienceStatus,
} from 'apis/experiencesApi';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';

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
