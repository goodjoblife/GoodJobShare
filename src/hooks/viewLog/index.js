import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import { viewExperiencesApi, viewSalaryWorkTimesApi } from 'apis/viewLogApi';

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
