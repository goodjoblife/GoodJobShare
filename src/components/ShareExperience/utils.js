import R from 'ramda';

import {
  transferKeyToSnakecase,
} from 'utils/objectUtil';

const sortById = R.sortBy(R.prop('id'));

export const handleBlocks = R.compose(
  sortById,
  R.map(ele => ele[1]),
  R.toPairs
);

const propsInterviewForm = state => {
  const {
    companyQuery,
    companyId,
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
    companyId,
    region,
    jobTitle,
    experienceInYear,
    education,
    interviewTimeYear,
    interviewTimeMonth,
    interviewResult,
    salaryType,
    salaryAmount: Number(salaryAmount),
    overallRating,
    title,
    sections: handleBlocks(sections),
    interviewQas: handleBlocks(interviewQas),
    interviewSensitiveQuestions,
  };
};

const propsBasicForm = state => {
  const {
    company,
    companyId,
    isCurrentlyEmployed,
    jobEndingTimeYear,
    jobEndingTimeMonth,
    jobTitle,
    sector,
    employmentType,
    gender,
    email,
  } = state;

  return {
    company,
    companyId,
    isCurrentlyEmployed,
    jobEndingTimeYear,
    jobEndingTimeMonth,
    jobTitle,
    sector,
    employmentType,
    gender,
    email,
  };
};

const propsSalaryForm = state => {
  const {
    salaryType,
    salaryAmount,
    experienceInYear,
  } = state;

  return {
    salaryType,
    salaryAmount,
    experienceInYear,
  };
};

const propsTimeForm = state => {
  const {
    dayPromisedWorkTime,
    dayRealWorkTime,
    weekWorkTime,
    overtimeFrequency,
    hasOvertimeSalary,
    isOvertimeSalaryLegal,
    hasCompensatoryDayoff,
  } = state;

  return {
    dayPromisedWorkTime,
    dayRealWorkTime,
    weekWorkTime,
    overtimeFrequency,
    hasOvertimeSalary,
    isOvertimeSalaryLegal,
    hasCompensatoryDayoff,
  };
};

const needDeleteInterviewQas = R.compose(
    n => n === 1,
    R.length,
);

const filterEmptyInterviewQas = R.filter(
  R.allPass([
    R.compose(
      n => n !== 0,
      s => s.length,
      R.defaultTo(''),
      R.prop('question')
    ),
  ])
);

const handleInterviewQas = interviewForm => {
  const data = {
    ...interviewForm,
    interviewQas: filterEmptyInterviewQas(interviewForm.interviewQas),
  };

  if (needDeleteInterviewQas(data)) {
    return R.omit(['interviewQas'])(data);
  }
  return data;
};

const handleInterviewExperienceInYear = interviewForm => {
  let data = interviewForm;

  if (!interviewForm.experienceInYear) {
    data = R.omit(['experienceInYear'])(data);
  }
  return data;
};

export const handleSalaryAmount = interviewForm => {
  let data = interviewForm;

  if (!interviewForm.salaryAmount) {
    data = R.omit(['salaryAmount', 'salaryType'])(data);
  }
  return data;
};

export const getInterviewForm = R.compose(
  handleSalaryAmount,
  handleInterviewExperienceInYear,
  handleInterviewQas,
  propsInterviewForm
);

export const getBasicForm = propsBasicForm;
export const getSalaryForm = propsSalaryForm;
export const getTimeForm = propsTimeForm;
export const getTimeAndSalaryForm = state => ({
  ...propsBasicForm(state),
  ...propsSalaryForm(state),
  ...propsTimeForm(state),
});
export const getExtraForm = extraFields => state =>
  R.fromPairs(extraFields.map(({ key }) => [key, state ? state[key] : '']));
export const getCampaignExtendedForm = extraFields => state => ({
  aboutThisJob: state.jobContent,
  ...getExtraForm(extraFields)(state),
});
export const getCampaignTimeAndSalaryForm = extraFields => state => ({
  campaignName: state.campaignName,
  ...getTimeAndSalaryForm(state),
  ...getCampaignExtendedForm(extraFields)(state),
});

export const portInterviewFormToRequestFormat = interviewForm => {
  let body = {
    ...interviewForm,
    interviewTime: {
      year: interviewForm.interviewTimeYear,
      month: interviewForm.interviewTimeMonth,
    },
  };

  if (interviewForm.salaryAmount) {
    body = {
      ...body,
      salary: {
        type: interviewForm.salaryType,
        amount: interviewForm.salaryAmount,
      },
    };
  }

  body = R.omit([
    'interviewTimeYear',
    'interviewTimeMonth',
    'salaryType',
    'salaryAmount',
  ])(body);

  body = transferKeyToSnakecase(body);

  return body;
};

export const portTimeSalaryFormToRequestFormat = form => {
  const isEmployed = form.isCurrentlyEmployed === 'yes';
  let body = Object.assign({}, form, {
    jobEndingTimeYear: form.jobEndingTimeYear.toString(),
    jobEndingTimeMonth: form.jobEndingTimeMonth.toString(),
  });

  if (isEmployed) {
    body = R.omit([
      'jobEndingTimeYear',
      'jobEndingTimeMonth',
    ])(body);
  }

  return transferKeyToSnakecase(body);
};

const portWorkExperiencesFormToRequestFormat = workExperiencesForm => {
  let body = {
    ...workExperiencesForm,
    jobEndingTime: {
      year: workExperiencesForm.jobEndingTimeYear,
      month: workExperiencesForm.jobEndingTimeMonth,
    },
  };

  if (workExperiencesForm.salaryAmount) {
    body = {
      ...body,
      salary: {
        type: workExperiencesForm.salaryType,
        amount: workExperiencesForm.salaryAmount,
      },
    };
  }

  body = R.omit([
    'jobEndingTimeYear',
    'jobEndingTimeMonth',
    'salaryType',
    'salaryAmount',
  ])(body);

  body = transferKeyToSnakecase(body);

  return body;
};

export const idGenerator = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

export const propsWorkExperiencesForm = state => {
  const {
    companyQuery,
    companyId,
    region,
    jobTitle,
    experienceInYear,
    education,
    isCurrentlyEmployed,
    jobEndingTimeYear,
    jobEndingTimeMonth,
    salaryType,
    salaryAmount,
    weekWorkTime,
    recommendToOthers,
    overallRating,
    title,
    sections,
  } = state;

  return {
    companyQuery,
    companyId,
    region,
    jobTitle,
    experienceInYear,
    education,
    isCurrentlyEmployed,
    jobEndingTimeYear,
    jobEndingTimeMonth,
    salaryType,
    salaryAmount: Number(salaryAmount),
    weekWorkTime: Number(weekWorkTime),
    recommendToOthers,
    overallRating,
    title,
    sections: handleBlocks(sections),
  };
};


export const workExperiencesToBody = R.compose(
  handleSalaryAmount,
  portWorkExperiencesFormToRequestFormat,
  handleInterviewExperienceInYear,
  propsWorkExperiencesForm
);
