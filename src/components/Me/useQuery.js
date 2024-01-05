import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { queryMyPublishesApi } from 'apis/me';
import {
  patchExperience as patchExperienceApi,
  patchReply as patchReplyApi,
} from 'apis/experiencesApi';
import { patchWorking as patchWorkingApi } from 'apis/timeAndSalaryApi';

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
      return patchExperienceApi({
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
      return patchWorkingApi({
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
