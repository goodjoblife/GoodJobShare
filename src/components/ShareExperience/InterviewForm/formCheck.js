import R from 'ramda';

import {
  notStrEmpty,
  notNullOrUndefined,
  gteLength,
  lteLength,
  gtLength,
} from 'utils/dataCheckUtil';

export const companyQuery = R.allPass([
  notStrEmpty,
]);

export const region = R.allPass([
  notNullOrUndefined,
]);

export const jobTitle = R.allPass([
  notStrEmpty,
]);

export const experienceInYear = R.allPass([
  n => n >= 0,
  n => n <= 50,
]);

export const interviewTimeYear = R.allPass([
  notNullOrUndefined,
]);

export const interviewTimeMonth = R.allPass([
  notNullOrUndefined,
]);

export const interviewResult = R.allPass([
  gteLength(0),
  lteLength(10),
]);

export const salaryAmount = R.allPass([
  n => n >= 0,
]);

export const overallRating = R.allPass([
  n => n >= 1,
  n => n <= 5,
]);

export const title = R.allPass([
  gtLength(0),
  lteLength(25),
]);

const sectionSubtitle = R.compose(
  R.allPass([
    lteLength(25),
    gtLength(0),
  ]),
  R.prop('subtitle')
);

const sectionContent = R.compose(
  R.allPass([
    lteLength(5000),
    gtLength(0),
  ]),
  R.prop('content')
);

export const singleSection = R.allPass([
  sectionSubtitle,
  sectionContent,
]);

export const sections = R.allPass([
  R.all(singleSection),
  gtLength(0),
]);

const interviewQaQuestion = R.compose(
  R.allPass([
    lteLength(250),
    gtLength(0),
  ]),
  R.prop('question')
);

const interviewQaAnswer = R.compose(
  R.allPass([
    lteLength(5000),
    gtLength(0),
  ]),
  R.prop('answer')
);

export const singleInterviewQa = R.allPass([
  interviewQaAnswer,
  interviewQaQuestion,
]);

export const interviewQas = R.allPass([
  R.all(singleInterviewQa),
  lteLength(30),
]);

export const interviewSensitiveQuestions = R.allPass([
  lteLength(20),
  gtLength(0),
]);

export const interviewFormCheck = R.allPass([
  R.compose(
    companyQuery,
    R.prop('companyQuery')
  ),
  R.compose(
    region,
    R.prop('region')
  ),
  R.compose(
    jobTitle,
    R.prop('jobTitle')
  ),
  R.compose(
    experienceInYear,
    R.prop('experienceInYear')
  ),
  R.compose(
    interviewTimeYear,
    R.prop('interviewTimeYear')
  ),
  R.compose(
    interviewTimeMonth,
    R.prop('interviewTimeMonth')
  ),
  R.compose(
    t => notNullOrUndefined(t) && interviewResult(t),
    R.prop('interviewResult')
  ),
  R.compose(
    salaryAmount,
    R.prop('salaryAmount')
  ),
  R.compose(
    overallRating,
    R.prop('overallRating')
  ),
  R.compose(
    title,
    R.prop('title')
  ),
  R.compose(
    sections,
    R.prop('sections')
  ),
  R.compose(
    interviewQas,
    R.prop('interviewQas')
  ),
  R.compose(
    interviewSensitiveQuestions,
    R.prop('interviewSensitiveQuestions')
  ),
]);
