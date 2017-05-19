import R from 'ramda';

import {
  checkWordingLength,
} from '../utils';

export const companyQuery = R.allPass(
  checkWordingLength
);

export const foo = 1;
// region
// jobTitle
// experienceInYear
// education
// interviewTimeYear
// interviewTimeMonth
// interviewResult
// salaryType
// salaryAmount
// overallRating
// title
// sections
// interviewQas
// interviewSensitiveQuestions
