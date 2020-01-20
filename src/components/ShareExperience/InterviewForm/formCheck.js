import R from 'ramda';

import {
  notStrEmpty,
  notNullOrUndefined,
  lteLength,
  gteLength,
  gtLength,
} from 'utils/dataCheckUtil';

import { ifThenLog } from 'utils/debugUtil';

export const companyQuery = R.allPass([notStrEmpty]);

export const region = R.allPass([notStrEmpty]);

export const jobTitle = R.allPass([notStrEmpty]);

export const experienceInYear = R.anyPass([
  R.allPass([n => n >= 0, n => n <= 50]),
  n => n === null || n === undefined,
]);

export const interviewTimeYear = R.allPass([n => n > 0]);

export const interviewTimeMonth = R.allPass([n => n > 0, n => n < 13]);

export const interviewResult = t =>
  notNullOrUndefined(t) && R.allPass([gtLength(0), lteLength(100)])(t);

export const salaryAmount = R.anyPass([
  R.allPass([n => n >= 0]),
  n => n === undefined,
]);

export const overallRating = R.allPass([n => n >= 1, n => n <= 5]);

export const title = R.allPass([gtLength(0), lteLength(50)]);

const sectionSubtitle = R.compose(
  R.allPass([lteLength(25), gtLength(0)]),
  R.prop('subtitle'),
);

const sectionContent = R.compose(
  R.allPass([lteLength(5000), gtLength(0)]),
  R.prop('content'),
);

export const singleSection = R.allPass([sectionSubtitle, sectionContent]);

export const sections = R.allPass([R.all(singleSection), gtLength(0)]);

const interviewQaQuestion = R.compose(
  R.allPass([lteLength(250), gtLength(0)]),
  R.prop('question'),
);

const interviewQaAnswer = R.compose(
  R.anyPass([
    R.allPass([lteLength(5000), gteLength(0)]),
    n => n === undefined || n === null,
  ]),
  R.prop('answer'),
);

export const singleInterviewQa = R.allPass([
  interviewQaAnswer,
  interviewQaQuestion,
]);

export const interviewQas = R.allPass([
  R.all(singleInterviewQa),
  lteLength(30),
]);

export const interviewSensitiveQuestions = R.anyPass([
  R.all(
    R.compose(
      R.allPass([lteLength(20), gtLength(0)]),
      R.defaultTo(''),
    ),
  ),
  n => n === [],
]);

const ifFalseLog = ifThenLog(n => n === false);

export const interviewFormCheck = R.allPass([
  R.compose(
    ifFalseLog('companyQuery not pass'),
    companyQuery,
    R.path(['company', 'query']),
  ),
  R.compose(
    ifFalseLog('region not pass'),
    region,
    R.prop('region'),
  ),
  R.compose(
    ifFalseLog('jobTitle not pass'),
    jobTitle,
    R.prop('jobTitle'),
  ),
  R.compose(
    ifFalseLog('experienceInYear not pass'),
    experienceInYear,
    R.prop('experienceInYear'),
  ),
  R.compose(
    ifFalseLog('interviewTimeYear not pass'),
    interviewTimeYear,
    R.prop('interviewTimeYear'),
  ),
  R.compose(
    ifFalseLog('interviewTimeMonth not pass'),
    interviewTimeMonth,
    R.prop('interviewTimeMonth'),
  ),
  R.compose(
    ifFalseLog('interviewResult not pass'),
    t => notNullOrUndefined(t) && interviewResult(t),
    R.prop('interviewResult'),
  ),
  R.compose(
    ifFalseLog('salaryAmount not pass'),
    salaryAmount,
    R.prop('salaryAmount'),
  ),
  R.compose(
    ifFalseLog('overallRating not pass'),
    overallRating,
    R.prop('overallRating'),
  ),
  R.compose(
    ifFalseLog('title not pass'),
    title,
    R.prop('title'),
  ),
  R.compose(
    ifFalseLog('sections not pass'),
    sections,
    R.prop('sections'),
  ),
  R.compose(
    ifFalseLog('interviewQas not pass'),
    interviewQas,
    R.prop('interviewQas'),
  ),
  R.compose(
    ifFalseLog('interviewSensitiveQuestions not pass'),
    interviewSensitiveQuestions,
    R.prop('interviewSensitiveQuestions'),
  ),
]);
