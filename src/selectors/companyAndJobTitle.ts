import R from 'ramda';
import { RootState } from 'reducers';
import {
  CompanyInIndex,
  CompanyOverview,
  CompanyOverviewStatistics,
  CompanyTimeAndSalaryResult,
  CompanyTimeAndSalaryStatistics,
  CompanyInterviewExperienceResult,
  CompanyWorkExperienceResult,
  CompanyWorkExperienceAspectStatistics,
  CompanyWorkExperienceAspectExperienceResult,
  CompanyIsSubscribed,
  TopNJobTitles,
} from 'reducers/companyIndex';
import {
  JobTitleInIndex,
  JobTitleOverview,
  JobTitleOverviewStatistics,
  JobTitleTimeAndSalaryResult,
  JobTitleTimeAndSalaryStatistics,
  JobTitleInterviewExperienceResult,
  JobTitleWorkExperienceResult,
} from 'reducers/jobTitleIndex';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
import FetchBox, { getUnfetched, isFetched } from 'utils/fetchBox';

export const salaryWorkTimeStatistics: (
  box: FetchBox<unknown>,
) => unknown = R.pipe(
  state => state.data,
  R.when(R.is(Object), R.prop('salary_work_time_statistics')),
  R.defaultTo({}),
);

export const companyIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<CompanyInIndex[]> =>
  state.companyIndex.indexesByPage[page] || getUnfetched();

export const companiesCountSelector = (state: RootState): number => {
  const indexCountBox = state.companyIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const companyRatingStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<RatingStatistics | null> =>
  state.companyIndex.ratingStatisticsByName[companyName] || getUnfetched();

export const companyOverviewBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyOverview | null> =>
  state.companyIndex.overviewByName[companyName] || getUnfetched();

export const companyOverviewStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyOverviewStatistics | null> =>
  state.companyIndex.overviewStatisticsByName[companyName] || getUnfetched();

export const companyTimeAndSalaryBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyTimeAndSalaryResult | null> =>
  state.companyIndex.timeAndSalaryByName[companyName] || getUnfetched();

export const companyTimeAndSalaryStatisticsBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyTimeAndSalaryStatistics | null> =>
  state.companyIndex.timeAndSalaryStatisticsByName[companyName] ||
  getUnfetched();

export const companyTopNJobTitlesBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<TopNJobTitles | null> =>
  state.companyIndex.topNJobTitlesByName[companyName] || getUnfetched();

export const companyEsgSalaryDataBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<ESGSalaryData | null> =>
  state.companyIndex.esgSalaryData[companyName] || getUnfetched();

export const companyInterviewExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyInterviewExperienceResult | null> =>
  state.companyIndex.interviewExperiencesByName[companyName] || getUnfetched();

export const companyWorkExperiencesBoxSelectorByName = (
  companyName: string,
) => (state: RootState): FetchBox<CompanyWorkExperienceResult | null> =>
  state.companyIndex.workExperiencesByName[companyName] || getUnfetched();

export const companyWorkExperiencesAspectStatisticsBoxSelectorByName = (
  companyName: string,
) => (
  state: RootState,
): FetchBox<CompanyWorkExperienceAspectStatistics | null> => {
  return (
    (state.companyIndex.workExperiencesAspectStatisticsByName &&
      state.companyIndex.workExperiencesAspectStatisticsByName[companyName]) ||
    getUnfetched()
  );
};

export const companyWorkExperiencesAspectExperiencesBoxSelectorByName = (
  companyName: string,
) => (
  state: RootState,
): FetchBox<CompanyWorkExperienceAspectExperienceResult | null> => {
  return (
    (state.companyIndex.workExperiencesAspectExperiencesByName &&
      state.companyIndex.workExperiencesAspectExperiencesByName[companyName]) ||
    getUnfetched()
  );
};

export const companyIsSubscribedBoxSelectorByName = (companyName: string) => (
  state: RootState,
): FetchBox<CompanyIsSubscribed | null> =>
  state.companyIndex.isSubscribedByName[companyName] || getUnfetched();

export const jobTitleIndexesBoxSelectorAtPage = (page: number) => (
  state: RootState,
): FetchBox<JobTitleInIndex[]> =>
  state.jobTitleIndex.indexesByPage[page] || getUnfetched();

export const jobTitlesCountSelector = (state: RootState): number => {
  const indexCountBox = state.jobTitleIndex.indexCountBox;
  return isFetched(indexCountBox) ? indexCountBox.data : 0;
};

export const jobTitleOverviewBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleOverview | null> =>
  state.jobTitleIndex.overviewByName[jobTitle] || getUnfetched();

export const jobTitleOverviewStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleOverviewStatistics | null> =>
  state.jobTitleIndex.overviewStatisticsByName[jobTitle] || getUnfetched();

export const jobTitleTimeAndSalaryBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleTimeAndSalaryResult | null> =>
  state.jobTitleIndex.timeAndSalaryByName[jobTitle] || getUnfetched();

export const jobTitleTimeAndSalaryStatisticsBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleTimeAndSalaryStatistics | null> =>
  state.jobTitleIndex.timeAndSalaryStatisticsByName[jobTitle] || getUnfetched();

export const jobTitleInterviewExperiencesBoxSelectorByName = (
  jobTitle: string,
) => (state: RootState): FetchBox<JobTitleInterviewExperienceResult | null> =>
  state.jobTitleIndex.interviewExperiencesByName[jobTitle] || getUnfetched();

export const jobTitleWorkExperiencesBoxSelectorByName = (jobTitle: string) => (
  state: RootState,
): FetchBox<JobTitleWorkExperienceResult | null> =>
  state.jobTitleIndex.workExperiencesByName[jobTitle] || getUnfetched();
