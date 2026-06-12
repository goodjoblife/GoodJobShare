import {
  SET_COMPANY_ESG_SALARY_DATA,
  SET_COMPANY_TOP_N_JOB_TITLES,
  SET_INDEX,
  SET_INDEX_COUNT,
  SET_INTERVIEW_EXPERIENCES,
  SET_IS_SUBSCRIBED,
  SET_OVERVIEW,
  SET_OVERVIEW_STATISTICS,
  SET_RATING_STATISTICS,
  SET_SALARY_WORK_TIME,
  SET_SALARY_WORK_TIME_STATISTICS,
  SET_WORK_EXPERIENCES,
  SET_WORK_EXPERIENCES_ASPECT_EXPERIENCES,
  SET_WORK_EXPERIENCES_ASPECT_STATISTICS,
} from 'actions/company';
import { AspectStatisticsData } from 'apis/aspectRatingStatistics';
import { WorkExperience } from 'apis/experience';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { RatingStatistics } from 'apis/queryCompanyRatingStatistics';
import {
  JobAverageSalary,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';
import { Aspect } from 'constants/companyJobTitle';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

// TODO: replace with proper CompanyInIndex type
export type CompanyInIndex = unknown;

// Flattened from QueryCompanyOverviewData, so a type is defined here
export type CompanyOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
};

// Flattened from QueryCompanyOverviewStatisticsData, so a type is defined here
export type CompanyOverviewStatistics = {
  jobAverageSalaries: JobAverageSalary[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

// TODO: replace with proper CompanySalaryWorkTimeResult type
export type CompanySalaryWorkTimeResult = unknown;

// TODO: replace with proper CompanySalaryWorkTimeStatistics type
export type CompanySalaryWorkTimeStatistics = unknown;

// TODO: replace with proper CompanyInterviewExperienceResult type
export type CompanyInterviewExperienceResult = unknown;

export type CompanyWorkExperienceResult = {
  name: string;
  jobTitle: string | undefined;
  start: number;
  limit: number;
  sortBy: string | undefined;
  workExperiences: WorkExperience[];
  workExperiencesCount: number;
};

// Flattened from QueryCompanyWorkExperiencesData, so a type is defined here
export type CompanyAspectExperienceResult = {
  name: string;
  aspect: Aspect;
  rating: number | null;
  start: number;
  limit: number;
  workExperiences: WorkExperience[];
  workExperiencesCount: number;
};

// TODO: replace with proper CompanyIsSubscribed type
export type CompanyIsSubscribed = unknown;

// TODO: replace with proper TopNJobTitles type
export type TopNJobTitles = unknown;

type State = {
  indexesByPage: Record<number, FetchBox<CompanyInIndex[]>>;
  indexCountBox: FetchBox<number>;
  ratingStatisticsByName: Record<string, FetchBox<RatingStatistics | null>>;
  overviewByName: Record<string, FetchBox<CompanyOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<CompanyOverviewStatistics | null>
  >;
  timeAndSalaryByName: Record<
    string,
    FetchBox<CompanySalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<CompanySalaryWorkTimeStatistics | null>
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<CompanyInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<CompanyWorkExperienceResult | null>
  >;
  workExperiencesAspectStatisticsByName: Record<
    string,
    FetchBox<AspectStatisticsData | null>
  >;
  workExperiencesAspectExperiencesByName: Record<
    string,
    FetchBox<CompanyAspectExperienceResult | null>
  >;
  isSubscribedByName: Record<string, FetchBox<CompanyIsSubscribed | null>>;
  topNJobTitlesByName: Record<string, FetchBox<TopNJobTitles | null>>;
  esgSalaryData: Record<string, FetchBox<ESGSalaryData | null>>;
};

const preloadedState: State = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> box
  ratingStatisticsByName: {},
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
  workExperiencesAspectStatisticsByName: {},
  workExperiencesAspectExperiencesByName: {},
  isSubscribedByName: {},
  // companyName --> box
  // box.data: null | {all, interview, work, salary}
  topNJobTitlesByName: {},
  esgSalaryData: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }: { box: FetchBox<number> }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (
    state,
    { page, box }: { page: number; box: FetchBox<CompanyInIndex[]> },
  ) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_RATING_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<RatingStatistics | null> },
  ) => {
    return {
      ...state,
      ratingStatisticsByName: {
        ...state.ratingStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<CompanyOverview | null> },
  ) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<CompanyOverviewStatistics | null> },
  ) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_SALARY_WORK_TIME]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanySalaryWorkTimeResult | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [companyName]: box,
      },
    };
  },
  [SET_SALARY_WORK_TIME_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanySalaryWorkTimeStatistics | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanyInterviewExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanyWorkExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES_ASPECT_STATISTICS]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<AspectStatisticsData | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesAspectStatisticsByName: {
        ...state.workExperiencesAspectStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES_ASPECT_EXPERIENCES]: (
    state,
    {
      companyName,
      box,
    }: {
      companyName: string;
      box: FetchBox<CompanyAspectExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesAspectExperiencesByName: {
        ...state.workExperiencesAspectExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_TOP_N_JOB_TITLES]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<TopNJobTitles | null> },
  ) => {
    return {
      ...state,
      topNJobTitlesByName: {
        ...state.topNJobTitlesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_ESG_SALARY_DATA]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<ESGSalaryData | null> },
  ) => {
    return {
      ...state,
      esgSalaryData: {
        ...state.esgSalaryData,
        [companyName]: box,
      },
    };
  },
  [SET_IS_SUBSCRIBED]: (
    state,
    {
      companyName,
      box,
    }: { companyName: string; box: FetchBox<CompanyIsSubscribed | null> },
  ) => {
    return {
      ...state,
      isSubscribedByName: {
        ...state.isSubscribedByName,
        [companyName]: box,
      },
    };
  },
});

export default reducer;
