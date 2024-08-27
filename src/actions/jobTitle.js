import { isGraphqlError } from 'utils/errors';
import {
  isFetching,
  isFetched,
  toFetching,
  getFetched,
  getError,
} from 'utils/fetchBox';
import {
  jobTitleIndexesBoxSelectorAtPage,
  jobTitleOverviewBoxSelectorByName,
  jobTitleTimeAndSalaryBoxSelectorByName,
  jobTitleInterviewExperiencesBoxSelectorByName,
  jobTitleWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  queryJobTitleOverview as queryJobTitleOverviewApi,
  getJobTitleTimeAndSalary,
  getJobTitleInterviewExperiences,
  getJobTitleWorkExperiences,
  queryJobTitlesApi,
} from 'apis/jobTitle';

export const SET_OVERVIEW = '@@JOB_TITLE/SET_OVERVIEW';
export const SET_TIME_AND_SALARY = '@@JOB_TITLE/SET_TIME_AND_SALARY';
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

const setOverview = (jobTitle, box) => ({
  type: SET_OVERVIEW,
  jobTitle,
  box,
});

export const queryJobTitleOverview = jobTitle => async (dispatch, getState) => {
  const box = jobTitleOverviewBoxSelectorByName(jobTitle)(getState());
  if (isFetching(box) || isFetched(box)) {
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
      salary_distribution: data.salary_distribution,
      salary_work_time_statistics: data.salary_work_time_statistics,
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

const setTimeAndSalary = (jobTitle, box) => ({
  type: SET_TIME_AND_SALARY,
  jobTitle,
  box,
});

export const queryJobTitleTimeAndSalary = ({
  companyName,
  jobTitle,
  start,
  limit,
}) => async (dispatch, getState) => {
  const box = jobTitleTimeAndSalaryBoxSelectorByName(jobTitle)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.name === jobTitle &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setTimeAndSalary(jobTitle, toFetching()));

  try {
    const data = await getJobTitleTimeAndSalary({
      jobTitle,
      companyName,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setTimeAndSalary(jobTitle, getFetched(data)));
    }

    const timeAndSalaryData = {
      name: data.name,
      companyName,
      start,
      limit,
      salary_work_times: data.salaryWorkTimesResult.salaryWorkTimes,
      salary_work_times_count: data.salaryWorkTimesResult.count,
      salary_work_time_statistics: data.salary_work_time_statistics,
    };

    dispatch(setTimeAndSalary(jobTitle, getFetched(timeAndSalaryData)));
  } catch (error) {
    dispatch(setTimeAndSalary(jobTitle, getError(error)));
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
}) => async (dispatch, getState) => {
  const box = jobTitleInterviewExperiencesBoxSelectorByName(jobTitle)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setInterviewExperiences(jobTitle, toFetching()));

  try {
    const data = await getJobTitleInterviewExperiences({
      jobTitle,
      companyName,
      start,
      limit,
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
      interview_experiences:
        data.interviewExperiencesResult.interviewExperiences,
      interview_experiences_count: data.interviewExperiencesResult.count,
    };

    dispatch(
      setInterviewExperiences(jobTitle, getFetched(interviewExperiencesyData)),
    );
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
}) => async (dispatch, getState) => {
  const box = jobTitleWorkExperiencesBoxSelectorByName(jobTitle)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.name === jobTitle &&
      box.data.companyName === companyName &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setWorkExperiences(jobTitle, toFetching()));

  try {
    const data = await getJobTitleWorkExperiences({
      jobTitle,
      companyName,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setWorkExperiences(jobTitle, getFetched(data)));
    }

    const workExperiencesData = {
      name: data.name,
      companyName,
      start,
      limit,
      work_experiences: data.workExperiencesResult.workExperiences,
      work_experiences_count: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(jobTitle, getFetched(workExperiencesData)));
  } catch (error) {
    dispatch(setWorkExperiences(jobTitle, getError(error)));
  }
};
