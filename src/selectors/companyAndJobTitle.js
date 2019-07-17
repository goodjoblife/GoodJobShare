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
);

export const salaryWorkTimes = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_times')),
);

export const salaryWorkTimeStatistics = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
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
