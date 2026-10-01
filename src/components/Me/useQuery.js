import { useCallback, useState } from 'react';

import changeExperienceStatus from 'apis/changeExperienceStatus';
import changePolicyReviewGroupStatus from 'apis/changePolicyReviewGroupStatus';
import changeReplyStatus from 'apis/changeReplyStatus';
import { queryMyPublishesApi } from 'apis/me';
import queryPolicyReviewGroup from 'apis/queryPolicyReviewGroup';
import { changeSalaryWorkTimeStatus } from 'apis/timeAndSalaryApi';
import { useToken } from 'hooks/auth';
import { getError, getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

export const useFetchMyPublishesBox = () => {
  const token = useToken();

  const [box, setBox] = useState(getUnfetched());

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

export const useFetchPolicyReviewGroupBox = () => {
  const token = useToken();

  const [box, setBox] = useState(getUnfetched());

  const fetchPolicyReviewGroup = useCallback(
    async groupId => {
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

export const useToggleExperienceStatus = () => {
  const token = useToken();
  return useCallback(
    o => {
      return changeExperienceStatus({
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
      return changeSalaryWorkTimeStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};

export const useTogglePolicyReviewGroupStatus = () => {
  const token = useToken();
  return useCallback(
    ({ groupId, status }) => {
      return changePolicyReviewGroupStatus({
        groupId,
        status: status === 'published' ? 'hidden' : 'published',
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
      return changeReplyStatus({
        id: o.id,
        status: o.status === 'published' ? 'hidden' : 'published',
        token,
      });
    },
    [token],
  );
};
