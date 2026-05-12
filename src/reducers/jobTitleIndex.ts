import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
  SET_OVERVIEW_STATISTICS,
} from 'actions/jobTitle';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import {
  SalaryDistributionBin,
  OvertimeFrequencyCount,
  SalaryWorkTime,
} from 'apis/salaryWorkTime';

// TODO: replace with proper JobTitleInIndex type
export type JobTitleInIndex = unknown;

// Flattened from QueryJobTitleOverviewData, so a type is defined here
export type JobTitleOverview = {
  name: string;
  salaryWorkTimes: SalaryWorkTime[];
  salaryWorkTimesCount: number;
  interviewExperiences: InterviewExperienceInOverview[];
  interviewExperiencesCount: number;
  workExperiences: WorkExperienceInOverview[];
  workExperiencesCount: number;
};

// Flattened from QueryJobTitleOverviewStatisticsData, so a type is defined here
export type JobTitleOverviewStatistics = {
  salaryDistribution: SalaryDistributionBin[];
  averageWeekWorkTime: number;
  overtimeFrequencyCount: OvertimeFrequencyCount | null;
};

// TODO: replace with proper JobTitleTimeAndSalaryResult type
export type JobTitleTimeAndSalaryResult = unknown;

// TODO: replace with proper JobTitleTimeAndSalaryStatistics type
export type JobTitleTimeAndSalaryStatistics = unknown;

// TODO: replace with proper JobTitleInterviewExperienceResult type
export type JobTitleInterviewExperienceResult = unknown;

// TODO: replace with proper JobTitleWorkExperienceResult type
export type JobTitleWorkExperienceResult = unknown;

type State = {
  indexesByPage: Record<number, FetchBox<JobTitleInIndex[]>>;
  indexCountBox: FetchBox<number>;
  overviewByName: Record<string, FetchBox<JobTitleOverview | null>>;
  overviewStatisticsByName: Record<
    string,
    FetchBox<JobTitleOverviewStatistics | null>
  >;
  timeAndSalaryByName: Record<
    string,
    FetchBox<JobTitleTimeAndSalaryResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<JobTitleTimeAndSalaryStatistics | null>
  >;
  interviewExperiencesByName: Record<
    string,
    FetchBox<JobTitleInterviewExperienceResult | null>
  >;
  workExperiencesByName: Record<
    string,
    FetchBox<JobTitleWorkExperienceResult | null>
  >;
};

const preloadedState: State = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // jobTitle --> overviewBox
  overviewByName: {},
  overviewStatisticsByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }: { box: FetchBox<number> }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (
    state,
    { page, box }: { page: number; box: FetchBox<JobTitleInIndex[]> },
  ) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_OVERVIEW]: (
    state,
    {
      jobTitle,
      box,
    }: { jobTitle: string; box: FetchBox<JobTitleOverview | null> },
  ) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_OVERVIEW_STATISTICS]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleOverviewStatistics | null>;
    },
  ) => {
    return {
      ...state,
      overviewStatisticsByName: {
        ...state.overviewStatisticsByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleTimeAndSalaryResult | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY_STATISTICS]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleTimeAndSalaryStatistics | null>;
    },
  ) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleInterviewExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleWorkExperienceResult | null>;
    },
  ) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [jobTitle]: box,
      },
    };
  },
});

export default reducer;
