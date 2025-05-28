import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import {
  trackEventApi,
  viewExperiencesApi,
  viewSalaryWorkTimesApi,
} from 'apis/viewLogApi';

export const useViewExperiences = () => {
  const token = useToken();
  return useCallback(
    async ({ contentIds, referrer }) => {
      try {
        await viewExperiencesApi({ token, contentIds, referrer });
      } catch (error) {
        console.error(error);
      }
    },
    [token],
  );
};

export const useViewSalaryWorkTimes = () => {
  const token = useToken();
  return useCallback(
    async ({ contentIds, referrer }) => {
      try {
        await viewSalaryWorkTimesApi({ token, contentIds, referrer });
      } catch (error) {
        console.error(error);
      }
    },
    [token],
  );
};

export const useTrackEvent = () => {
  const token = useToken();
  const trackEvent = useCallback(
    async (name, itemId, itemType) => {
      const referrer = window.location.href;
      try {
        await trackEventApi({
          token,
          name,
          itemId,
          itemType,
          referrer,
        });
      } catch (err) {
        console.error(`Failed to trace ${name} ${itemId}: ${err}`);
      }
    },
    [token],
  );

  return trackEvent;
};
