import { useCallback, useState } from 'react';

import queryPolicyReviewGroup, {
  PolicyReviewGroup,
} from 'apis/queryPolicyReviewGroup';
import { useToken } from 'hooks/auth';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

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
