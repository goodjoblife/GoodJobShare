import R from 'ramda';

import { notStrEmpty } from 'utils/dataCheckUtil';

import { ifThenLog } from 'utils/debugUtil';

export const company = R.allPass([notStrEmpty]);

export const jobTitle = R.allPass([notStrEmpty]);

export const employmentType = R.allPass([notStrEmpty]);

export const salaryType = R.allPass([notStrEmpty]);

export const salaryAmount = R.allPass([notStrEmpty, n => n >= 0]);

export const experienceInYear = R.allPass([
  notStrEmpty,
  n => n >= 0,
  n => n <= 50,
]);

export const dayPromisedWorkTime = R.allPass([notStrEmpty]);

export const dayRealWorkTime = R.allPass([notStrEmpty]);

export const weekWorkTime = R.allPass([notStrEmpty]);

export const overtimeFrequency = R.allPass([t => t !== null]);

const ifFalseLog = ifThenLog(n => n === false);

export const basicFormCheck = R.allPass([
  R.compose(
    ifFalseLog('company not pass'),
    company,
    R.prop('company'),
  ),
  R.compose(
    ifFalseLog('jobTitle not pass'),
    jobTitle,
    R.prop('jobTitle'),
  ),
  R.compose(
    ifFalseLog('employmentType not pass'),
    employmentType,
    R.prop('employmentType'),
  ),
]);

export const salaryFormCheck = R.allPass([
  R.compose(
    ifFalseLog('salaryType not pass'),
    salaryType,
    R.prop('salaryType'),
  ),
  R.compose(
    ifFalseLog('salaryAmount not pass'),
    salaryAmount,
    R.prop('salaryAmount'),
  ),
  R.compose(
    ifFalseLog('experienceInYear not pass'),
    experienceInYear,
    R.prop('experienceInYear'),
  ),
]);

export const timeFormCheck = R.allPass([
  R.compose(
    ifFalseLog('dayPromisedWorkTime not pass'),
    dayPromisedWorkTime,
    R.prop('dayPromisedWorkTime'),
  ),
  R.compose(
    ifFalseLog('dayRealWorkTime not pass'),
    dayRealWorkTime,
    R.prop('dayRealWorkTime'),
  ),
  R.compose(
    ifFalseLog('weekWorkTime not pass'),
    weekWorkTime,
    R.prop('weekWorkTime'),
  ),
  R.compose(
    ifFalseLog('overtimeFrequency not pass'),
    overtimeFrequency,
    R.prop('overtimeFrequency'),
  ),
]);
