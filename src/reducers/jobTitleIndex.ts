import {
  SET_INDEX,
  SET_INDEX_COUNT,
  SET_INTERVIEW_EXPERIENCES,
  SET_OVERVIEW,
  SET_OVERVIEW_STATISTICS,
  SET_SALARY_WORK_TIME,
  SET_SALARY_WORK_TIME_STATISTICS,
  SET_WORK_EXPERIENCES,
} from 'actions/jobTitle';
import { WorkExperience } from 'apis/experience';
import {
  InterviewExperienceInOverview,
  WorkExperienceInOverview,
} from 'apis/overview';
import {
  OvertimeFrequencyCount,
  SalaryDistributionBin,
  SalaryWorkTime,
  SalaryWorkTimeStats,
} from 'apis/salaryWorkTime';
import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

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

// TODO: replace with proper JobTitleSalaryWorkTimeResult type
export type JobTitleSalaryWorkTimeResult = unknown;

// TODO: replace with proper JobTitleInterviewExperienceResult type
export type JobTitleInterviewExperienceResult = unknown;

export type JobTitleWorkExperienceResult = {
  name: string;
  companyName?: string;
  start: number;
  limit: number;
  sortBy?: string;
  workExperiences: WorkExperience[];
  workExperiencesCount: number;
};

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
    FetchBox<JobTitleSalaryWorkTimeResult | null>
  >;
  timeAndSalaryStatisticsByName: Record<
    string,
    FetchBox<SalaryWorkTimeStats | null>
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
  [SET_SALARY_WORK_TIME]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<JobTitleSalaryWorkTimeResult | null>;
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
  [SET_SALARY_WORK_TIME_STATISTICS]: (
    state,
    {
      jobTitle,
      box,
    }: {
      jobTitle: string;
      box: FetchBox<SalaryWorkTimeStats | null>;
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
