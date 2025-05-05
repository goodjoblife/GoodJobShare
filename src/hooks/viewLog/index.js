import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import {
  traceEventApi,
  viewExperiencesApi,
  viewSalaryWorkTimesApi,
} from 'apis/viewLogApi';

export const useViewExperiences = () => {
  const token = useToken();
  return useCallback(
    ({ contentIds, referrer }) => {
      return viewExperiencesApi({ token, contentIds, referrer });
    },
    [token],
  );
};

export const useViewSalaryWorkTimes = () => {
  const token = useToken();
  return useCallback(
    ({ contentIds, referrer }) => {
      return viewSalaryWorkTimesApi({ token, contentIds, referrer });
    },
    [token],
  );
};

export const useTraceEvent = () => {
  const token = useToken();
  const traceEvent = useCallback(
    async ({ contentId, contentType, action }) => {
      const referrer = window.location.href;
      try {
        await traceEventApi({
          token,
          action,
          contentId,
          contentType,
          referrer,
        });
      } catch (err) {
        console.error(`Failed to trace ${action} ${contentId}: ${err}`);
      }
    },
    [token],
  );

  return traceEvent;
};
