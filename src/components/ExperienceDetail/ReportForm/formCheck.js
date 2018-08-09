import R from 'ramda';

import { reasonCategoryOptions } from './ReportForm';

export const isReasonLimit = reasonCategory =>
  reasonCategory !== '這是廣告或垃圾訊息';

export const validReason = isLimit =>
  R.anyPass([
    () => !isLimit,
    R.compose(
      R.allPass([n => n > 0, n => n <= 500]),
      R.length
    ),
  ]);

export const validReasonCategory = reasonCategory =>
  R.contains(reasonCategory, reasonCategoryOptions.map(r => r.value));

export const validReasomForm = R.allPass([
  R.compose(
    n => validReason(isReasonLimit(n[1]))(n[0]),
    n => R.pair(R.prop('reason')(n), R.prop('reasonCategory')(n))
  ),
  R.compose(
    validReasonCategory,
    R.prop('reasonCategory')
  ),
]);
