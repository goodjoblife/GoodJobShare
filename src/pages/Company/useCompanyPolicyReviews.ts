import { useEffect, useMemo, useState } from 'react';

import queryCompanyPolicyReviews, {
  CompanyPolicyReviewStatistics,
  Policy,
  PolicyReview,
} from 'apis/queryCompanyPolicyReviews';
import { LeavePolicyRecord } from 'components/CompanyAndJobTitle/LeavePolicySection';
import { LeaveSection } from 'components/CompanyAndJobTitle/LeaveSectionBlock';

const COUNT_LABELS = {
  yes: '是',
  no: '否',
  unknown: '不知道',
};

const COMPLIANCE_LABELS = {
  yes: '符合勞基法',
  no: '不符合勞基法',
  unknown: '不知道',
};

const REMOTE_WORK_LABELS = {
  ONE_DAY_PER_WEEK: '1天',
  TWO_DAYS_PER_WEEK: '2天',
  THREE_DAYS_PER_WEEK: '3天',
  FOUR_DAYS_PER_WEEK: '大於3天',
  NO_LIMIT: '大於3天',
};

const POLICY_WITH_COMPLIANCE: Policy[] = [
  'MENSTRUAL_LEAVE',
  'PARENTAL_LEAVE',
  'FAMILY_CARE_LEAVE',
];

const emptyCount = { yes: 0, no: 0, unknown: 0 };

const toDistribution = (
  count: typeof emptyCount,
  labels: typeof COUNT_LABELS | typeof COMPLIANCE_LABELS,
): LeaveSection['availability'] => {
  const dataCount = count.yes + count.no + count.unknown;
  return {
    dataCount,
    items: (Object.keys(labels) as (keyof typeof COUNT_LABELS)[]).map(key => ({
      label: labels[key],
      percentage: dataCount === 0 ? 0 : (count[key] / dataCount) * 100,
    })),
  };
};

const toRemoteWorkDistribution = (
  counts?: CompanyPolicyReviewStatistics['remoteWorkPolicyCount'],
): LeaveSection['availability'] => {
  const countByLabel = (counts || []).reduce<Record<string, number>>(
    (result, { remoteWorkPolicy, count }) => {
      const label = REMOTE_WORK_LABELS[remoteWorkPolicy];
      return { ...result, [label]: (result[label] || 0) + count };
    },
    {},
  );
  const dataCount = Object.values(countByLabel).reduce(
    (total, count) => total + count,
    0,
  );
  return {
    dataCount,
    items: ['1天', '2天', '3天', '大於3天'].map(label => ({
      label,
      percentage:
        dataCount === 0 ? 0 : ((countByLabel[label] || 0) / dataCount) * 100,
    })),
  };
};

export const toLeaveSection = (
  statistics: CompanyPolicyReviewStatistics | undefined,
  policy: Policy,
): LeaveSection => {
  const availability = toDistribution(
    statistics ? statistics.hasPolicyCount : emptyCount,
    COUNT_LABELS,
  );
  const section: LeaveSection = {
    dataCount: availability.dataCount,
    availability,
  };

  if (POLICY_WITH_COMPLIANCE.includes(policy)) {
    section.compliance = toDistribution(
      statistics && statistics.complianceCount
        ? statistics.complianceCount
        : emptyCount,
      COMPLIANCE_LABELS,
    );
  }

  if (policy === 'REMOTE_WORK') {
    section.compliance = toRemoteWorkDistribution(
      statistics && statistics.remoteWorkPolicyCount,
    );
  }

  return section;
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
  availability: COUNT_LABELS[review.hasPolicy],
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
  section: LeaveSection;
  statistics: CompanyPolicyReviewStatistics[];
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
    const statistics = data ? data.policyReviewStatistics : [];
    const result = data ? data.policyReviewsResult : null;
    return {
      records: result ? result.policyReviews.map(toRecord) : [],
      section: toLeaveSection(
        statistics.find(item => item.policy === policy),
        policy,
      ),
      statistics,
      totalCount: result ? result.count : 0,
    };
  }, [data, policy]);
};

export default useCompanyPolicyReviews;
