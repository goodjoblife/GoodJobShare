import qs from 'qs';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';

import { HasPolicy } from 'apis/queryCompanyPolicyReviews';
import { useQuery } from 'hooks/routing';
import {
  HAS_POLICY_QUERY_KEY,
  HAS_POLICY_VALUES,
  hasPolicyFromQuerySelector,
} from 'selectors/policyFilter';

const useHasPolicyFilter = (): readonly [
  HasPolicy[],
  (value: HasPolicy) => void,
] => {
  const history = useHistory();
  const query = useQuery();
  const selectedHasPolicy = useMemo(() => hasPolicyFromQuerySelector(query), [
    query,
  ]);

  const toggleHasPolicy = useCallback(
    (value: HasPolicy): void => {
      // 依 HAS_POLICY_VALUES 的順序組回去，網址才不會因為點選順序而不同
      const next = HAS_POLICY_VALUES.filter(v =>
        v === value
          ? !selectedHasPolicy.includes(v)
          : selectedHasPolicy.includes(v),
      );
      // 後端是對篩選後的列表分頁，篩選一改，原本的頁數就不適用了
      const { p, [HAS_POLICY_QUERY_KEY]: prev, ...restQuery } = query;
      history.replace({
        search: qs.stringify(
          next.length === HAS_POLICY_VALUES.length
            ? restQuery
            : { ...restQuery, [HAS_POLICY_QUERY_KEY]: next.join(',') },
          { addQueryPrefix: true },
        ),
      });
    },
    [query, selectedHasPolicy, history],
  );

  return [selectedHasPolicy, toggleHasPolicy] as const;
};

export default useHasPolicyFilter;
