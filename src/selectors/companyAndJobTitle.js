import R from 'ramda';
import STATUS from 'constants/status';

export const status = R.compose(
  R.defaultTo(STATUS.UNFETCHED),
  R.prop('status'),
);

const data = state => state.data;

export const interviewExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences')),
  R.defaultTo([]),
);
export const workExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('work_experiences')),
  R.defaultTo([]),
);

export const salaryWorkTimes = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_times')),
  R.defaultTo([]),
);

export const salaryDistribution = R.pipe(
  data,
  R.when(R.is(Object), R.path(['salary_distribution', 'bins'])),
  R.defaultTo([]),
);

export const salaryWorkTimeStatistics = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
  R.defaultTo({}),
);

export const jobAverageSalaries = R.pipe(
  salaryWorkTimeStatistics,
  R.prop('job_average_salaries'),
  R.defaultTo([]),
);

export const averageWeekWorkTime = R.pipe(
  salaryWorkTimeStatistics,
  R.prop('average_week_work_time'),
  R.defaultTo(0),
);

export const overtimeFrequencyCount = R.pipe(
  salaryWorkTimeStatistics,
  R.prop('overtime_frequency_count'),
  R.defaultTo({
    seldom: 0,
    sometimes: 0,
    usually: 0,
    almost_everyday: 0,
  }),
);

export const company = companyName =>
  R.compose(
    R.defaultTo({}),
    R.path(['company', companyName]),
  );
export const companyStatus = companyName =>
  R.compose(
    status,
    company(companyName),
  );

export const jobTitle = jobTitleName =>
  R.compose(
    R.defaultTo({}),
    R.path(['jobTitle', jobTitleName]),
  );
export const jobTitleStatus = jobTitleName =>
  R.compose(
    status,
    jobTitle(jobTitleName),
  );

const companyIndex = R.prop('companyIndex');

export const companyNamesStatus = R.compose(
  status,
  companyIndex,
);

export const companyNames = R.compose(
  data,
  companyIndex,
);

const jobTitleIndex = R.prop('jobTitleIndex');

export const jobTitlesStatus = R.compose(
  status,
  jobTitleIndex,
);

export const jobTitles = R.compose(
  data,
  jobTitleIndex,
);
