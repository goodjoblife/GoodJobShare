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

export const useTraceEvent = ({ contentId, contentType, action }) => {
  const token = useToken();
  const traceEvent = useCallback(
    ({ action, contentId, contentType, referrer }) =>
      traceEventApi({ token, action, contentId, contentType, referrer }),
    [token],
  );

  return useCallback(async () => {
    const referrer = window.location.href;
    try {
      console.log(`Trace ${action} ${contentId} ${contentType} ${referrer}`);
      await traceEvent({ action, contentId, contentType, referrer });
    } catch (err) {
      console.error(`Failed to trace ${action} ${contentId}: ${err}`);
    }
  }, [traceEvent, action, contentId, contentType]);
};
