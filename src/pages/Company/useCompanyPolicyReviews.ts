import { useEffect, useMemo, useState } from 'react';

import queryCompanyPolicyReviews, {
  Policy,
  PolicyReview,
  RemoteWorkPolicy,
} from 'apis/queryCompanyPolicyReviews';
import { LeavePolicyRecord } from 'components/CompanyAndJobTitle/LeavePolicySection';

const HAS_POLICY_LABELS: Record<PolicyReview['hasPolicy'], string> = {
  yes: '是',
  no: '否',
  unknown: '不知道',
};

const COMPLIANCE_LABELS: Record<'yes' | 'no' | 'unknown', string> = {
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
} => {
  const [data, setData] = useState<
    Awaited<ReturnType<typeof queryCompanyPolicyReviews>>
  >(null);

  useEffect(() => {
    let isActive = true;
    queryCompanyPolicyReviews({ companyName, policy, start, limit }).then(
      response => {
        if (isActive) {
          setData(response);
        }
      },
    );
    return () => {
      isActive = false;
    };
  }, [companyName, policy, start, limit]);

  return useMemo(() => {
    const result = data ? data.policyReviewsResult : null;
    return {
      records: result ? result.policyReviews.map(toRecord) : [],
      totalCount: result ? result.count : 0,
    };
  }, [data]);
};

export default useCompanyPolicyReviews;
