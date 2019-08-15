import R from 'ramda';
import STATUS from '../constants/status';

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

export const salaryWorkTimeStatistics = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
  R.defaultTo({}),
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
