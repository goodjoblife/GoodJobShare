import { useEffect, useState } from 'react';

import queryCompanyPolicyReviews, {
  HasPolicy,
  Policy,
  PolicyReview,
  RemoteWorkPolicy,
} from 'apis/queryCompanyPolicyReviews';
import { LeavePolicyRecord } from 'components/CompanyAndJobTitle/LeavePolicySection';
import { HAS_POLICY_VALUES } from 'selectors/policyFilter';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

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

export type PolicyReviewsResult = {
  records: LeavePolicyRecord[];
  totalCount: number;
};

const EMPTY_RESULT: PolicyReviewsResult = { records: [], totalCount: 0 };

const useCompanyPolicyReviewsBox = ({
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
}): FetchBox<PolicyReviewsResult> => {
  const [box, setBox] = useState<FetchBox<PolicyReviewsResult>>(getUnfetched());

  const isEmptySelection = hasPolicy.length === 0;

  useEffect(() => {
    if (isEmptySelection) {
      setBox(getFetched(EMPTY_RESULT));
      return;
    }
    setBox(prev => toFetching(prev));

    let isActive = true;
    queryCompanyPolicyReviews({
      companyName,
      policy,
      hasPolicy: toHasPolicyVariable(hasPolicy),
      start,
      limit,
    })
      .then(company => {
        if (!isActive) return;
        const result = company ? company.policyReviewsResult : undefined;
        setBox(
          getFetched(
            result
              ? {
                  records: result.policyReviews.map(toRecord),
                  totalCount: result.count,
                }
              : EMPTY_RESULT,
          ),
        );
      })
      .catch(error => {
        if (isActive) setBox(getError(error));
      });
    return (): void => {
      isActive = false;
    };
  }, [companyName, policy, hasPolicy, isEmptySelection, start, limit]);

  return box;
};

export default useCompanyPolicyReviewsBox;
