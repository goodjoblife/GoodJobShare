import { useEffect, useMemo, useRef, useState } from 'react';

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

const toFilterKey = (selectedHasPolicy: HasPolicy[]): string =>
  [...selectedHasPolicy].sort().join(',');

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
  // 參數 hasPolicy 是網址上的勾選狀態，使用者一點就變
  const selectedKey = toFilterKey(hasPolicy);

  // queried 是「已經拿去查詢的那份篩選」，跟網址上的勾選狀態是兩回事：
  // 使用者還在切換的那 800ms 內，queried 停在上一次查詢的選擇，跟網址不一樣，
  // 直到安靜下來才追上。所以凡是跟 request 有關的判斷都只能看 queried，
  // 畫面上勾勾的狀態則是看網址的那份。
  const [queried, setQueried] = useState(() => ({
    key: selectedKey,
    hasPolicy,
  }));

  // queried 追上網址了沒？沒追上就代表還在 debounce
  const isFilterSettled = queried.key === selectedKey;

  // 排程時要用最新的勾選狀態，但它的 reference 不該害排程重來，所以放 ref
  const hasPolicyRef = useRef(hasPolicy);
  hasPolicyRef.current = hasPolicy;

  useEffect(() => {
    // 已經追上就沒什麼要排程的；使用者在 800ms 內切回原本的選擇時也會走到
    // 這裡，順手把還沒觸發的排程清掉，不會多打一次已經有資料的 request
    if (isFilterSettled) return;
    const timer = setTimeout(
      () => setQueried({ key: selectedKey, hasPolicy: hasPolicyRef.current }),
      FILTER_DEBOUNCE_DELAY,
    );
    return (): void => clearTimeout(timer);
  }, [isFilterSettled, selectedKey]);

  const [box, setBox] = useState<FetchBox<PolicyReviewsResult>>(getUnfetched());

  // 注意：以下都是 queried.hasPolicy，不是參數的 hasPolicy
  const queriedHasPolicy = queried.hasPolicy;
  const isEmptySelection = queriedHasPolicy.length === 0;

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
      hasPolicy: toHasPolicyVariable(queriedHasPolicy),
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
  }, [companyName, policy, queriedHasPolicy, isEmptySelection, start, limit]);

  // queried 還沒追上網址的期間讓表格蓋上 loading（舊資料留著當底圖），
  // 因為此時 box 裝的是上一個篩選的結果，跟畫面上的勾勾對不起來
  return useMemo(() => (isFilterSettled ? box : toFetching(box)), [
    isFilterSettled,
    box,
  ]);
};

export default useCompanyPolicyReviewsBox;
