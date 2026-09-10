import qs from 'qs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useDebounce } from 'react-use';

import queryCompanyPolicyReviews, {
  HasPolicy,
  Policy,
  PolicyReview,
  RemoteWorkPolicy,
} from 'apis/queryCompanyPolicyReviews';
import { LeavePolicyRecord } from 'components/CompanyAndJobTitle/LeavePolicySection';
import { useQuery } from 'hooks/routing';

export const HAS_POLICY_VALUES: HasPolicy[] = ['yes', 'no', 'unknown'];

const FILTER_DEBOUNCE_DELAY = 800;

const HAS_POLICY_LABELS: Record<HasPolicy, string> = {
  yes: '是',
  no: '否',
  unknown: '不知道',
};

const COMPLIANCE_LABELS: Record<HasPolicy, string> = {
  yes: '符合勞基法',
  no: '不符合勞基法',
  unknown: '不知道',
};

const REMOTE_WORK_LABELS: Record<RemoteWorkPolicy, string> = {
  ONE_DAY_PER_WEEK: '1天',
  TWO_DAYS_PER_WEEK: '2天',
  THREE_DAYS_PER_WEEK: '3天',
  FOUR_DAYS_PER_WEEK: '大於3天',
  NO_LIMIT: '大於3天',
};

const toDate = (value: string): string =>
  new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date(value))
    .replace(/\//g, '.');

const toRecord = (review: PolicyReview): LeavePolicyRecord => ({
  id: review.id,
  jobTitle: review.jobTitle,
  region: review.sector || '',
  availability: HAS_POLICY_LABELS[review.hasPolicy],
  compliance: review.compliance
    ? COMPLIANCE_LABELS[review.compliance]
    : review.remoteWorkPolicy
    ? REMOTE_WORK_LABELS[review.remoteWorkPolicy]
    : undefined,
  experience: review.review || '',
  sharedAt: toDate(review.createdAt),
});

// The backend rejects an empty array, so ask it to filter only on a real subset
const toHasPolicyVariable = (selectedValues: HasPolicy[]): HasPolicy[] | null =>
  selectedValues.length === HAS_POLICY_VALUES.length ? null : selectedValues;

const useCompanyPolicyReviews = ({
  companyName,
  policy,
  start,
  limit,
}: {
  companyName: string;
  policy: Policy;
  start: number;
  limit: number;
}): {
  records: LeavePolicyRecord[];
  totalCount: number;
  selectedValues: HasPolicy[];
  toggleValue: (value: HasPolicy) => void;
} => {
  const history = useHistory();
  const query = useQuery();
  const [selectedValues, setSelectedValues] = useState<HasPolicy[]>(
    HAS_POLICY_VALUES,
  );
  const [debouncedSelectedValues, setDebouncedSelectedValues] = useState(
    selectedValues,
  );
  useDebounce(
    () => setDebouncedSelectedValues(selectedValues),
    FILTER_DEBOUNCE_DELAY,
    [selectedValues],
  );

  // The backend paginates the filtered list, so the current page no longer
  // applies once the filter changes
  const toggleValue = useCallback(
    (value: HasPolicy): void => {
      setSelectedValues(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value],
      );
      const { p, ...restQuery } = query;
      if (p !== undefined) {
        history.replace({
          search: qs.stringify(restQuery, { addQueryPrefix: true }),
        });
      }
    },
    [query, history],
  );

  const [data, setData] = useState<
    Awaited<ReturnType<typeof queryCompanyPolicyReviews>>
  >(null);
  const isEmptySelection = debouncedSelectedValues.length === 0;

  useEffect(() => {
    if (isEmptySelection) return;
    let isActive = true;
    queryCompanyPolicyReviews({
      companyName,
      policy,
      hasPolicy: toHasPolicyVariable(debouncedSelectedValues),
      start,
      limit,
    }).then(response => {
      if (isActive) {
        setData(response);
      }
    });
    return () => {
      isActive = false;
    };
  }, [
    companyName,
    policy,
    debouncedSelectedValues,
    isEmptySelection,
    start,
    limit,
  ]);

  return useMemo(() => {
    const result = isEmptySelection || !data ? null : data.policyReviewsResult;
    return {
      records: result ? result.policyReviews.map(toRecord) : [],
      totalCount: result ? result.count : 0,
      selectedValues,
      toggleValue,
    };
  }, [data, isEmptySelection, selectedValues, toggleValue]);
};

export default useCompanyPolicyReviews;
