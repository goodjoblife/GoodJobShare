import R from 'ramda';
import { getUnfetched, isFetched } from 'utils/fetchBox';

const data = state => state.data;

export const salaryWorkTimeStatistics = R.pipe(
  data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
  R.defaultTo({}),
);

export const companyIndexesBoxSelectorAtPage = page => state => {
  return state.companyIndex.indexesByPage[page] || getUnfetched();
};

export const companiesCountSelector = state => {
  const indexCountBox = state.companyIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const companyRatingStatisticsBoxSelectorByName = companyName => state => {
  return (
    state.companyIndex.ratingStatisticsByName[companyName] || getUnfetched()
  );
};

export const companyOverviewBoxSelectorByName = companyName => state => {
  return state.companyIndex.overviewByName[companyName] || getUnfetched();
};

export const companyTimeAndSalaryBoxSelectorByName = companyName => state => {
  return state.companyIndex.timeAndSalaryByName[companyName] || getUnfetched();
};

export const companyTimeAndSalaryStatisticsBoxSelectorByName = companyName => state => {
  return (
    state.companyIndex.timeAndSalaryStatisticsByName[companyName] ||
    getUnfetched()
  );
};

export const companyTopNJobTitlesBoxSelectorByName = companyName => state => {
  return state.companyIndex.topNJobTitlesByName[companyName] || getUnfetched();
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

export const jobTitleTimeAndSalaryStatisticsBoxSelectorByName = jobTitle => state => {
  return (
    state.jobTitleIndex.timeAndSalaryStatisticsByName[jobTitle] ||
    getUnfetched()
  );
};

export const jobTitleInterviewExperiencesBoxSelectorByName = jobTitle => state => {
  return (
    state.jobTitleIndex.interviewExperiencesByName[jobTitle] || getUnfetched()
  );
};

export const jobTitleWorkExperiencesBoxSelectorByName = jobTitle => state => {
  return state.jobTitleIndex.workExperiencesByName[jobTitle] || getUnfetched();
};
