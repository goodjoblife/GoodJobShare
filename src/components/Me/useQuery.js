import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import meApi from 'apis/me';
import experiencesApi from 'apis/experiencesApi';
import timeAndSalaryApi from 'apis/timeAndSalaryApi';

export const useFetchMyPublishes = () => {
  const token = useToken();

  const [state, callback] = useAsyncFn(() => meApi.getMyPublishes({ token }), [
    token,
  ]);

  return [state, callback];
};

export const useToggleExperienceStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return experiencesApi.patchExperience({
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
      return timeAndSalaryApi.patchWorking({
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
      return experiencesApi.patchReply({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
