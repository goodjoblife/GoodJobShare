import { useCallback, useState } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changePolicyReviewGroupStatus, {
  PublishStatus,
} from 'apis/changePolicyReviewGroupStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import { queryMyPublishesApi } from 'apis/me';
import queryPolicyReviewGroup, {
  PolicyReviewGroup,
} from 'apis/queryPolicyReviewGroup';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

// apis/me 還是 JS，拿不到回傳型別；這裡只負責搬運，交給使用端解讀
type MyPublishes = unknown;

type PublishItem = {
  id: string;
  status: PublishStatus;
};

const toggled = (status: PublishStatus): PublishStatus =>
  status === 'published' ? 'hidden' : 'published';

export const useFetchMyPublishesBox = (): [
  FetchBox<MyPublishes>,
  () => Promise<void>,
] => {
  const token = useToken();

  const [box, setBox] = useState<FetchBox<MyPublishes>>(getUnfetched());

  const callback = useCallback(async () => {
    setBox(prevBox => toFetching(prevBox));
    try {
      const data = await queryMyPublishesApi({ token });
      setBox(getFetched(data));
    } catch (error) {
      setBox(getError(error));
    }
  }, [token]);

  return [box, callback];
};

// 清單只拿得到整組共用的欄位，組內每一項制度等使用者點開才查
export const useFetchPolicyReviewGroupBox = (): [
  FetchBox<PolicyReviewGroup>,
  (groupId: string) => Promise<void>,
  () => void,
] => {
  const token = useToken();

  const [box, setBox] = useState<FetchBox<PolicyReviewGroup>>(getUnfetched());

  const fetchPolicyReviewGroup = useCallback(
    async (groupId: string) => {
      setBox(toFetching());
      try {
        setBox(getFetched(await queryPolicyReviewGroup({ groupId, token })));
      } catch (error) {
        setBox(getError(error));
      }
    },
    [token],
  );

  const clearPolicyReviewGroup = useCallback(() => setBox(getUnfetched()), []);

  return [box, fetchPolicyReviewGroup, clearPolicyReviewGroup];
};

export const useToggleExperienceStatus = (): ((
  o: PublishItem,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeExperienceStatus({
        id: o.id,
        status: toggled(o.status),
        token,
      });
    },
    [token],
  );
};

export const useToggleSalaryWorkTimeStatus = (): ((
  o: PublishItem,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeSalaryWorkTimeStatus({
        id: o.id,
        status: toggled(o.status),
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
        status: toggled(status),
        token,
      });
    },
    [token],
  );
};

export const useToggleReplyStatus = (): ((
  o: PublishItem,
) => Promise<unknown>) => {
  const token = useToken();
  return useCallback(
    (o: PublishItem) => {
      return changeReplyStatus({
        id: o.id,
        status: toggled(o.status),
        token,
      });
    },
    [token],
  );
};
