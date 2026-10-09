import { ParsedQs } from 'qs';

import { HasPolicy } from 'apis/queryCompanyPolicyReviews';

export const HAS_POLICY_QUERY_KEY = 'hasPolicy';

export const HAS_POLICY_VALUES: HasPolicy[] = ['yes', 'no', 'unknown'];

const isHasPolicy = (val: string): val is HasPolicy =>
  (HAS_POLICY_VALUES as string[]).includes(val);

// 沒帶這個 param 代表不篩選，所以回傳全選；帶了但是空字串代表一個都沒選
export const hasPolicyFromQuerySelector = (query: ParsedQs): HasPolicy[] => {
  const val = query[HAS_POLICY_QUERY_KEY];
  if (typeof val !== 'string') return HAS_POLICY_VALUES;
  return val.split(',').filter(isHasPolicy);
};
