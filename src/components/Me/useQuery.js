import { useCallback } from 'react';
import { useAsyncFn } from 'react-use';
import useToken from 'hooks/useToken';
import api from '../../apis';

export const useFetchMyPublishes = () => {
  const token = useToken();

  const [state, callback] = useAsyncFn(() => api.me.getMyPublishes({ token }), [
    token,
  ]);

  return [state, callback];
};

export const useToggleExperienceStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return api.experiences.patchExperience({
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
      return api.timeAndSalary.patchWorking({
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
      return api.experiences.patchReply({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
