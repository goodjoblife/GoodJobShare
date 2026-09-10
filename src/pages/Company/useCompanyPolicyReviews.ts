import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

import queryCompanyPolicyReviews, {
  HasPolicy,
  Policy,
  PolicyReview,
  RemoteWorkPolicy,
} from 'apis/queryCompanyPolicyReviews';
import { LeavePolicyRecord } from 'components/CompanyAndJobTitle/LeavePolicySection';
import { HAS_POLICY_VALUES } from 'selectors/policyFilter';

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

// 後端擋掉空陣列，所以只有真的篩掉某些答案時才帶這個變數
const toHasPolicyVariable = (
  selectedHasPolicy: HasPolicy[],
): HasPolicy[] | null =>
  selectedHasPolicy.length === HAS_POLICY_VALUES.length
    ? null
    : selectedHasPolicy;

const useCompanyPolicyReviews = ({
  companyName,
  policy,
  hasPolicy,
  start,
  limit,
}: {
  companyName: string;
  policy: Policy;
  hasPolicy: HasPolicy[];
  start: number;
  limit: number;
}): {
  records: LeavePolicyRecord[];
  totalCount: number;
} => {
  // 篩選的勾選狀態即時反映在網址上，但查詢等它停下來再發
  const [debouncedHasPolicy, setDebouncedHasPolicy] = useState(hasPolicy);
  useDebounce(() => setDebouncedHasPolicy(hasPolicy), FILTER_DEBOUNCE_DELAY, [
    hasPolicy,
  ]);

  const [data, setData] = useState<
    Awaited<ReturnType<typeof queryCompanyPolicyReviews>>
  >(null);
  const isEmptySelection = debouncedHasPolicy.length === 0;

  useEffect(() => {
    if (isEmptySelection) return;
    let isActive = true;
    queryCompanyPolicyReviews({
      companyName,
      policy,
      hasPolicy: toHasPolicyVariable(debouncedHasPolicy),
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
  }, [companyName, policy, debouncedHasPolicy, isEmptySelection, start, limit]);

  return useMemo(() => {
    const result = isEmptySelection || !data ? null : data.policyReviewsResult;
    return {
      records: result ? result.policyReviews.map(toRecord) : [],
      totalCount: result ? result.count : 0,
    };
  }, [data, isEmptySelection]);
};

export default useCompanyPolicyReviews;
