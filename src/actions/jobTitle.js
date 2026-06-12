import R from 'ramda';

import {
  getJobTitleInterviewExperiences,
  getJobTitleTimeAndSalary,
  getJobTitleTimeAndSalaryStatistics,
  queryJobTitlesApi,
} from 'apis/jobTitle';
import queryJobTitleOverviewApi from 'apis/queryJobTitleOverview';
import queryJobTitleOverviewStatisticsApi from 'apis/queryJobTitleOverviewStatistics';
import queryJobTitleWorkExperiencesApi from 'apis/queryJobTitleWorkExperiences';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitleInterviewExperiencesBoxSelectorByName,
  jobTitleOverviewBoxSelectorByName,
  jobTitleOverviewStatisticsBoxSelectorByName,
  jobTitleSalaryWorktimeBoxSelectorByName,
  jobTitleSalaryWorkTimeStatisticsBoxSelectorByName,
  jobTitleWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { isGraphqlError } from 'utils/errors';
import {
  getError,
  getFetched,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

import { setExperience } from './experience';

export const SET_OVERVIEW = '@@JOB_TITLE/SET_OVERVIEW';
export const SET_OVERVIEW_STATISTICS = '@@JOB_TITLE/SET_OVERVIEW_STATISTICS';
export const SET_SALARY_WORK_TIME = '@@JOB_TITLE/SET_SALARY_WORK_TIME';
export const SET_SALARY_WORK_TIME_STATISTICS =
  '@@JOB_TITLE/SET_SALARY_WORK_TIME_STATISTICS';
export const SET_INTERVIEW_EXPERIENCES =
  '@@JOB_TITLE/SET_INTERVIEW_EXPERIENCES';
export const SET_WORK_EXPERIENCES = '@@JOB_TITLE/SET_WORK_EXPERIENCES';
export const SET_INDEX = '@@JOB_TITLE/SET_INDEX';
export const SET_INDEX_COUNT = '@@JOB_TITLE/SET_INDEX_COUNT';

const setIndex = (page, box) => ({
  type: SET_INDEX,
  page,
  box,
});

const setIndexCount = box => ({
  type: SET_INDEX_COUNT,
  box,
});

export const fetchJobTitles = ({ page, pageSize }) => async (
  dispatch,
  getState,
) => {
  const box = jobTitleIndexesBoxSelectorAtPage(page)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setIndex(page, toFetching()));
  dispatch(setIndexCount(toFetching()));

  try {
    const data = await queryJobTitlesApi({
      start: (page - 1) * pageSize,
      limit: pageSize,
    });
    dispatch(setIndex(page, getFetched(data.jobTitlesHavingData)));
    dispatch(setIndexCount(getFetched(data.jobTitlesHavingDataCount)));
  } catch (error) {
    if (isGraphqlError(error)) {
      return dispatch(setIndex(page, getError(error)));
    }
    throw error;
  }
};

const SALARY_WORK_TIMES_LIMIT = 5;
const WORK_EXPERIENCES_LIMIT = 3;
const INTERVIEW_EXPERIENCES_LIMIT = 3;

/**
 * @type {(
 *   jobTitle: string,
 *   box: import('utils/fetchBox').default<import('reducers/jobTitleIndex').JobTitleOverview | null>
 * ) => {
 *   type: string;
 *   jobTitle: string;
 *   box: import('utils/fetchBox').default<import('reducers/jobTitleIndex').JobTitleOverview | null>
 * }}
 */
const setOverview = (jobTitle, box) => ({
  type: SET_OVERVIEW,
  jobTitle,
  box,
});

export const queryJobTitleOverview = (
  jobTitle,
  { force = false } = {},
) => async (dispatch, getState) => {
  const box = jobTitleOverviewBoxSelectorByName(jobTitle)(getState());
  if (!force && (isFetching(box) || isFetched(box))) {
    return;
  }

  dispatch(setOverview(jobTitle, toFetching()));

  try {
    const data = await queryJobTitleOverviewApi({
      jobTitle,
      interviewExperiencesLimit: INTERVIEW_EXPERIENCES_LIMIT,
      workExperiencesLimit: WORK_EXPERIENCES_LIMIT,
      salaryWorkTimesLimit: SALARY_WORK_TIMES_LIMIT,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverview(jobTitle, getFetched(data)));
    }

    const overviewData = {
      name: data.name,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setOverview(jobTitle, getFetched(overviewData)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setOverview(jobTitle, getError(error)));
    }
    throw error;
  }
};

/**
 * @type {(
 *   jobTitle: string,
 *   box: import('utils/fetchBox').default<import('reducers/jobTitleIndex').JobTitleOverviewStatistics | null>
 * ) => {
 *   type: string;
 *   jobTitle: string;
 *   box: import('utils/fetchBox').default<import('reducers/jobTitleIndex').JobTitleOverviewStatistics | null>
 * }}
 */
const setOverviewStatistics = (jobTitle, box) => ({
  type: SET_OVERVIEW_STATISTICS,
  jobTitle,
  box,
});

export const queryJobTitleOverviewStatistics = jobTitle => async (
  dispatch,
  getState,
) => {
  const box = jobTitleOverviewStatisticsBoxSelectorByName(jobTitle)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setOverviewStatistics(jobTitle, toFetching()));

  try {
    const data = await queryJobTitleOverviewStatisticsApi({
      jobTitle,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverviewStatistics(jobTitle, getFetched(data)));
    }

    const model = {
      name: data.name,
      salaryDistribution: data.salary_distribution.bins || [],
      averageWeekWorkTime:
        data.salary_work_time_statistics.average_week_work_time || 0,
      overtimeFrequencyCount:
        data.salary_work_time_statistics.overtime_frequency_count || 0,
    };

    dispatch(setOverviewStatistics(jobTitle, getFetched(model)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setOverviewStatistics(jobTitle, getError(error)));
    }
    throw error;
  }
};

const setSalaryWorkTime = (jobTitle, box) => ({
  type: SET_SALARY_WORK_TIME,
  jobTitle,
  box,
});

/**
 * @type {(
 *   params: {
 *     companyName?: string;
 *     jobTitle: string;
 *     start: number;
 *     limit: number;
 *     dataTimeRange?: import('apis/salaryWorkTime').DataTimeRange;
 *     experienceInYearRange?: import('apis/salaryWorkTime').ExperienceInYearRange;
 *     gender?: string;
 *     sortBy?: string;
 *   },
 *   options?: { force?: boolean }
 * ) => (dispatch: any, getState: any) => Promise<void>}
 */
export const queryJobTitleSalaryWorkTime = (
  {
    companyName,
    jobTitle,
    start,
    limit,
    dataTimeRange,
    experienceInYearRange,
    gender,
    sortBy,
  },
  { force = false } = {},
) => async (dispatch, getState) => {
  const box = jobTitleSalaryWorktimeBoxSelectorByName(jobTitle)(getState());
  if (
    !force &&
    (isFetching(box) ||
      (isFetched(box) &&
        box.data &&
        box.data.name === jobTitle &&
        box.data.companyName === companyName &&
        box.data.start === start &&
        box.data.limit === limit &&
        R.equals(box.data.dataTimeRange, dataTimeRange) &&
        R.equals(box.data.experienceInYearRange, experienceInYearRange) &&
        box.data.gender === gender &&
        box.data.sortBy === sortBy))
  ) {
    return;
  }

  dispatch(setSalaryWorkTime(jobTitle, toFetching(box)));

  try {
    const data = await getJobTitleTimeAndSalary({
      jobTitle,
      companyName,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setSalaryWorkTime(jobTitle, getFetched(data)));
    }

    const salaryWorkTimeData = {
      name: data.name,
      companyName,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
    };

    dispatch(setSalaryWorkTime(jobTitle, getFetched(salaryWorkTimeData)));
  } catch (error) {
    dispatch(setSalaryWorkTime(jobTitle, getError(error)));
  }
};

const setSalaryWorkTimeStatistics = (jobTitle, box) => ({
  type: SET_SALARY_WORK_TIME_STATISTICS,
  jobTitle,
  box,
});

export const queryJobTitleSalaryWorkTimeStatistics = ({ jobTitle }) => async (
  dispatch,
  getState,
) => {
  const box = jobTitleSalaryWorkTimeStatisticsBoxSelectorByName(jobTitle)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) && box.data && box.data.name === jobTitle)
  ) {
    return;
  }

  dispatch(setSalaryWorkTimeStatistics(jobTitle, toFetching(box)));

  try {
    const data = await getJobTitleTimeAndSalaryStatistics({
      jobTitle,
    });

    // Not found case
    if (data == null) {
      return dispatch(setSalaryWorkTimeStatistics(jobTitle, getFetched(data)));
    }

    const salaryWorkTimeStatisticsData = {
      name: data.name,
      salary_work_time_statistics: data.salary_work_time_statistics,
    };

    dispatch(
      setSalaryWorkTimeStatistics(
        jobTitle,
        getFetched(salaryWorkTimeStatisticsData),
      ),
    );
  } catch (error) {
    dispatch(setSalaryWorkTimeStatistics(jobTitle, getError(error)));
  }
};

const setInterviewExperiences = (jobTitle, box) => ({
  type: SET_INTERVIEW_EXPERIENCES,
  jobTitle,
  box,
});

export const queryJobTitleInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) => async (dispatch, getState) => {
  const box = jobTitleInterviewExperiencesBoxSelectorByName(jobTitle)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setInterviewExperiences(jobTitle, toFetching(box)));

  try {
    const data = await getJobTitleInterviewExperiences({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setInterviewExperiences(jobTitle, getFetched(data)));
    }

    const interviewExperiencesyData = {
      name: data.name,
      companyName,
      start,
      limit,
      sortBy,
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
    };

    dispatch(
      setInterviewExperiences(jobTitle, getFetched(interviewExperiencesyData)),
    );

    // Update state.experiences which is the source of truth for all experiences
    data.interviewExperiencesResult.interviewExperiences.forEach(e => {
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setInterviewExperiences(jobTitle, getError(error)));
  }
};

const setWorkExperiences = (jobTitle, box) => ({
  type: SET_WORK_EXPERIENCES,
  jobTitle,
  box,
});

export const queryJobTitleWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) => async (dispatch, getState) => {
  const box = jobTitleWorkExperiencesBoxSelectorByName(jobTitle)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.name === jobTitle &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setWorkExperiences(jobTitle, toFetching(box)));

  try {
    const data = await queryJobTitleWorkExperiencesApi({
      jobTitle,
      companyName,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setWorkExperiences(jobTitle, getFetched(data)));
    }

    /** @type {import('reducers/jobTitleIndex').JobTitleWorkExperienceResult} */
    const workExperiencesData = {
      name: data.name,
      companyName,
      start,
      limit,
      sortBy,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(jobTitle, getFetched(workExperiencesData)));

    // Update state.experiences which is the source of truth for all experiences
    data.workExperiencesResult.workExperiences.forEach(e => {
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setWorkExperiences(jobTitle, getError(error)));
  }
};
