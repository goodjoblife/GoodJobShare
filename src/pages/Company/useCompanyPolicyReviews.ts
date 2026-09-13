import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

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

export type PolicyReviewsResult = {
  records: LeavePolicyRecord[];
  totalCount: number;
};

// 用篩選值組出穩定的字串 key：值一樣 key 就一樣，換頁時不會因為 selectedHasPolicy
// 每次都是新的陣列 reference 而重打一次相同的 request
const toFilterKey = (selectedHasPolicy: HasPolicy[]): string =>
  [...selectedHasPolicy].sort().join(',');

const EMPTY_RESULT: PolicyReviewsResult = { records: [], totalCount: 0 };

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
}): FetchBox<PolicyReviewsResult> => {
  // 篩選的勾選狀態即時反映在網址上，但查詢等它停下來再發
  const filterKey = toFilterKey(hasPolicy);
  const [debouncedHasPolicy, setDebouncedHasPolicy] = useState(hasPolicy);
  useDebounce(() => setDebouncedHasPolicy(hasPolicy), FILTER_DEBOUNCE_DELAY, [
    // 依穩定的 key 觸發 debounce，值沒變就不重排程
    filterKey,
  ]);

  const [box, setBox] = useState<FetchBox<PolicyReviewsResult>>(getUnfetched());

  const isEmptySelection = debouncedHasPolicy.length === 0;
  // debounce 還沒追上目前的篩選（使用者還在切換）時先不要打，避免送出「舊篩選＋新頁碼」
  const isDebouncePending = toFilterKey(debouncedHasPolicy) !== filterKey;

  useEffect(() => {
    if (isEmptySelection) {
      setBox(getFetched(EMPTY_RESULT));
      return;
    }
    // 切換篩選期間先進 loading（保留舊資料當作 overlay 底圖），等 debounce 停下再打
    setBox(prev => toFetching(prev));
    if (isDebouncePending) return;

    let isActive = true;
    queryCompanyPolicyReviews({
      companyName,
      policy,
      hasPolicy: toHasPolicyVariable(debouncedHasPolicy),
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
    return () => {
      isActive = false;
    };
  }, [
    companyName,
    policy,
    filterKey,
    debouncedHasPolicy,
    isDebouncePending,
    isEmptySelection,
    start,
    limit,
  ]);

  return box;
};

export default useCompanyPolicyReviews;
