import R from 'ramda';

import {
  notStrEmpty,
  lteLength,
  gtLength,
} from 'utils/dataCheckUtil';

import {
  ifThenLog,
} from 'utils/debugUtil';

export const companyQuery = R.allPass([
  notStrEmpty,
]);

export const region = R.allPass([
  notStrEmpty,
]);

export const jobTitle = R.allPass([
  notStrEmpty,
]);

export const experienceInYear = R.anyPass([
  R.allPass([
    n => n >= 0,
    n => n <= 50,
  ]),
  n => n === null || n === undefined,
]);

export const salaryAmount = R.anyPass([
  R.allPass([
    n => n >= 0,
  ]),
  n => n === undefined,
]);

export const weekWorkTime = R.allPass([
  n => n >= 0,
  n => n <= 168,
]);


export const title = R.allPass([
  gtLength(0),
  lteLength(25),
]);

// const sectionSubtitle = R.compose(
//   R.allPass([
//     lteLength(25),
//     gtLength(0),
//   ]),
//   R.prop('subtitle')
// );

const sectionContent = R.compose(
  R.allPass([
    lteLength(5000),
    gtLength(0),
  ]),
  R.prop('content')
);

export const singleSection = R.allPass([
  // sectionSubtitle,
  sectionContent,
]);

export const sections = R.allPass([
  R.all(singleSection),
  gtLength(0),
]);

const ifFalseLog = ifThenLog(n => n === false);

export const workExperiencesFormCheck = R.allPass([
  R.compose(
    ifFalseLog('companyQuery not pass'),
    companyQuery,
    R.prop('companyQuery')
  ),
  R.compose(
    ifFalseLog('region not pass'),
    region,
    R.prop('region')
  ),
  R.compose(
    ifFalseLog('jobTitle not pass'),
    jobTitle,
    R.prop('jobTitle')
  ),
  R.compose(
    ifFalseLog('experienceInYear not pass'),
    experienceInYear,
    R.prop('experienceInYear')
  ),
  R.compose(
    ifFalseLog('salaryAmount not pass'),
    salaryAmount,
    R.prop('salaryAmount')
  ),
  R.compose(
    ifFalseLog('title not pass'),
    title,
    R.prop('title')
  ),
  R.compose(
    ifFalseLog('sections not pass'),
    sections,
    R.prop('sections')
  ),
  R.compose(
    ifFalseLog('weekWorkTime not pass'),
    weekWorkTime,
    R.prop('weekWorkTime')
  ),
]);
