import R from 'ramda';
import STATUS from 'constants/status';
import { getUnfetched, isFetched } from 'utils/fetchBox';

export const status = R.compose(
  R.defaultTo(STATUS.UNFETCHED),
  R.prop('status'),
);

const data = state => state.data;

export const name = R.pipe(
  data,
  R.when(R.is(Object), R.prop('name')),
);

export const interviewExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences')),
  R.defaultTo([]),
);

export const interviewExperiencesCount = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences_count')),
  R.defaultTo(0),
);

export const workExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('work_experiences')),
  R.defaultTo([]),
);

export const workExperiencesCount = R.pipe(
  data,
  R.when(R.is(Object), R.prop('work_experiences_count')),
  R.defaultTo(0),
);

export const salaryWorkTimes = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_times')),
  R.defaultTo([]),
);

export const salaryWorkTimesCount = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_times_count')),
  R.defaultTo(0),
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

export const companyIndexesBoxSelectorAtPage = page => state => {
  return state.companyIndex.indexesByPage[page] || getUnfetched();
};

export const companiesCountSelector = state => {
  const indexCountBox = state.companyIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const companyOverviewBoxSelectorByName = companyName => state => {
  return state.companyIndex.overviewByName[companyName] || getUnfetched();
};

export const companyTimeAndSalaryBoxSelectorByName = companyName => state => {
  return state.companyIndex.timeAndSalaryByName[companyName] || getUnfetched();
};

export const companyInterviewExperiencesBoxSelectorByName = companyName => state => {
  return (
    state.companyIndex.interviewExperiencesByName[companyName] || getUnfetched()
  );
};

export const companyWorkExperiencesBoxSelectorByName = companyName => state => {
  return (
    state.companyIndex.workExperiencesByName[companyName] || getUnfetched()
  );
};

export const jobTitleIndexesBoxSelectorAtPage = page => state => {
  return state.jobTitleIndex.indexesByPage[page] || getUnfetched();
};

export const jobTitlesCountSelector = state => {
  const indexCountBox = state.jobTitleIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const jobTitleOverviewBoxSelectorByName = jobTitle => state => {
  return state.jobTitleIndex.overviewByName[jobTitle] || getUnfetched();
};

export const jobTitleTimeAndSalaryBoxSelectorByName = jobTitle => state => {
  return state.jobTitleIndex.timeAndSalaryByName[jobTitle] || getUnfetched();
};

export const jobTitleInterviewExperiencesBoxSelectorByName = jobTitle => state => {
  return (
    state.jobTitleIndex.interviewExperiencesByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleWorkExperiencesBoxSelectorByName = jobTitle => state => {
  return state.jobTitleIndex.workExperiencesByName[jobTitle] || getUnfetched();
};
