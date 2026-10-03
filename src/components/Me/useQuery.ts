import { useCallback } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changePolicyReviewGroupStatus, {
  PublishStatus,
} from 'apis/changePolicyReviewGroupStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import { queryMyPublishesApi } from 'apis/me';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';
import useAsyncBoxFn from 'hooks/useAsyncBoxFn';
import FetchBox from 'utils/fetchBox';

type PublishItem = { id: string; status: PublishStatus };

type Toggle = (o: PublishItem) => Promise<unknown>;

export const useFetchMyPublishesBox = (): readonly [
  FetchBox<unknown>,
  () => Promise<void>,
] => {
  const token = useToken();

  return useAsyncBoxFn(() => queryMyPublishesApi({ token }), [token]);
};

export const useToggleExperienceStatus = (): Toggle => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeExperienceStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleSalaryWorkTimeStatus = (): Toggle => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeSalaryWorkTimeStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useTogglePolicyReviewGroupStatus = (): ((o: {
  groupId: string;
  status: PublishStatus;
}) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    ({ groupId, status }: { groupId: string; status: PublishStatus }) => {
      return changePolicyReviewGroupStatus({
        groupId,
        status: status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useToggleReplyStatus = (): Toggle => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeReplyStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
