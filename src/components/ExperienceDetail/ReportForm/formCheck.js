import R from 'ramda';
import { experienceReportReasons, salaryReportReasons } from './constants';

export const isReasonLimit = reasonCategory => reasonCategory === '其他';

export const validReason = isLimit =>
  R.anyPass([
    () => !isLimit,
    R.compose(
      R.allPass([n => n > 0, n => n <= 500]),
      R.length,
    ),
  ]);

export const validReasonCategory = reasonCategory =>
  R.any(options => R.contains(reasonCategory, options.map(r => r.value)), [
    experienceReportReasons,
    salaryReportReasons,
  ]);

export const validReasomForm = R.allPass([
  R.compose(
    n => validReason(isReasonLimit(n[1]))(n[0]),
    n => R.pair(R.prop('reason')(n), R.prop('reasonCategory')(n)),
  ),
  R.compose(
    validReasonCategory,
    R.prop('reasonCategory'),
  ),
]);
