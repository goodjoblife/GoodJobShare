import R from 'ramda';

const sortById = R.sortBy(R.prop('id'));

export const handleBlocks = R.compose(
  sortById,
  R.map(ele => ele[1]),
  R.toPairs
);

export const getInterviewForm = state => {
  const {
    companyQuery,
    region,
    jobTitle,
    experienceInYear,
    education,
    interviewTimeYear,
    interviewTimeMonth,
    interviewResult,
    salaryType,
    salaryAmount,
    overallRating,
    title,
    sections,
    interviewQas,
    interviewSensitiveQuestions,
  } = state;

  return {
    companyQuery,
    region,
    jobTitle,
    experienceInYear,
    education,
    interviewTimeYear,
    interviewTimeMonth,
    interviewResult,
    salaryType,
    salaryAmount,
    overallRating,
    title,
    sections: handleBlocks(sections),
    interviewQas: handleBlocks(interviewQas),
    interviewSensitiveQuestions,
  };
};
