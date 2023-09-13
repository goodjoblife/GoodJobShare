import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import viewLogApi from 'apis/viewLogApi';

export const useViewExperiences = () => {
  const token = useToken();
  return useCallback(
    ({ contentIds, referrer }) => {
      return viewLogApi.viewExperiences({ token, contentIds, referrer });
    },
    [token],
  );
};

export const useViewSalaryWorkTimes = () => {
  const token = useToken();
  return useCallback(
    ({ contentIds, referrer }) => {
      return viewLogApi.viewSalaryWorkTimes({ token, contentIds, referrer });
    },
    [token],
  );
};
