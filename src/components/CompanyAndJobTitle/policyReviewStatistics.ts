import {
  PolicyReviewStatistics,
  RemoteWorkPolicyCount,
} from 'apis/queryCompanyPolicyReviewStatistics';
import { YesNoOrUnknownCount } from 'apis/salaryWorkTime';
import {
  Policy,
  RemoteWorkPolicy,
  remoteWorkPolicyTranslation,
} from 'constants/policy';

import { LeaveSection } from './LeaveSectionBlock';
import { PolicyDistribution } from './PolicyBarChart';

type YesNoOrUnknownLabels = Record<keyof YesNoOrUnknownCount, string>;

const EMPTY_COUNT: YesNoOrUnknownCount = { yes: 0, no: 0, unknown: 0 };

const AVAILABILITY_LABELS: YesNoOrUnknownLabels = {
  yes: '是',
  no: '否',
  unknown: '不知道',
};

// 表單的「優於」與「符合」在 API 都記為 yes，因此統計只還原得出「符合勞基法」。
const COMPLIANCE_LABELS: YesNoOrUnknownLabels = {
  yes: '符合勞基法',
  no: '不符合勞基法',
  unknown: '不知道',
};

const REMOTE_WORK_POLICY_ORDER: RemoteWorkPolicy[] = [
  RemoteWorkPolicy.ONE_DAY_PER_WEEK,
  RemoteWorkPolicy.TWO_DAYS_PER_WEEK,
  RemoteWorkPolicy.THREE_DAYS_PER_WEEK,
  RemoteWorkPolicy.FOUR_DAYS_PER_WEEK,
  RemoteWorkPolicy.NO_LIMIT,
];

const REMOTE_WORK_LABELS: string[] = REMOTE_WORK_POLICY_ORDER.map(
  policy => remoteWorkPolicyTranslation[policy],
).filter((label, index, labels) => labels.indexOf(label) === index);

const toPercentage = (count: number, total: number): number =>
  total === 0 ? 0 : Math.round((count / total) * 100);

const toDistribution = (
  count: YesNoOrUnknownCount,
  labels: YesNoOrUnknownLabels,
): PolicyDistribution => {
  const dataCount = count.yes + count.no + count.unknown;
  return {
    dataCount,
    items: [
      { label: labels.yes, percentage: toPercentage(count.yes, dataCount) },
      { label: labels.no, percentage: toPercentage(count.no, dataCount) },
      {
        label: labels.unknown,
        percentage: toPercentage(count.unknown, dataCount),
      },
    ],
  };
};

const toRemoteWorkDistribution = (
  counts: RemoteWorkPolicyCount[],
): PolicyDistribution => {
  const dataCount = counts.reduce((sum, { count }) => sum + count, 0);
  const countByLabel = counts.reduce<Record<string, number>>(
    (acc, { remoteWorkPolicy, count }) => {
      const label = remoteWorkPolicyTranslation[remoteWorkPolicy];
      return { ...acc, [label]: (acc[label] || 0) + count };
    },
    {},
  );
  return {
    dataCount,
    items: REMOTE_WORK_LABELS.map(label => ({
      label,
      percentage: toPercentage(countByLabel[label] || 0, dataCount),
    })),
  };
};

// REMOTE_WORK 沒有法規符合度，改以每週遠端天數分佈填入同一個欄位。
const toComplianceDistribution = (
  statistics: PolicyReviewStatistics,
): PolicyDistribution | undefined => {
  if (statistics.complianceCount) {
    return toDistribution(statistics.complianceCount, COMPLIANCE_LABELS);
  }
  if (statistics.remoteWorkPolicyCount) {
    return toRemoteWorkDistribution(statistics.remoteWorkPolicyCount);
  }
  return undefined;
};

const statisticsOf = (
  statisticsList: PolicyReviewStatistics[] | null,
  policy: Policy,
): PolicyReviewStatistics | undefined =>
  statisticsList
    ? statisticsList.find(statistics => statistics.policy === policy)
    : undefined;

export const toAvailabilityDistribution = (
  statisticsList: PolicyReviewStatistics[] | null,
  policy: Policy,
): PolicyDistribution => {
  const statistics = statisticsOf(statisticsList, policy);
  return toDistribution(
    statistics ? statistics.hasPolicyCount : EMPTY_COUNT,
    AVAILABILITY_LABELS,
  );
};

export const toLeaveSection = (
  statisticsList: PolicyReviewStatistics[] | null,
  policy: Policy,
): LeaveSection => {
  const statistics = statisticsOf(statisticsList, policy);
  const availability = toDistribution(
    statistics ? statistics.hasPolicyCount : EMPTY_COUNT,
    AVAILABILITY_LABELS,
  );
  return {
    dataCount: availability.dataCount,
    availability,
    compliance: statistics ? toComplianceDistribution(statistics) : undefined,
  };
};
