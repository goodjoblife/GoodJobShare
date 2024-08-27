import { isGraphqlError } from 'utils/errors';
import {
  isFetching,
  isFetched,
  toFetching,
  getFetched,
  getError,
} from 'utils/fetchBox';
import {
  companyIndexesBoxSelectorAtPage,
  companyOverviewBoxSelectorByName,
  companyTimeAndSalaryBoxSelectorByName,
  companyInterviewExperiencesBoxSelectorByName,
  companyWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  queryCompanyOverview as queryCompanyOverviewApi,
  getCompanyTimeAndSalary,
  getCompanyInterviewExperiences,
  getCompanyWorkExperiences,
  queryCompaniesApi,
} from 'apis/company';

export const SET_OVERVIEW = '@@COMPANY/SET_OVERVIEW';
export const SET_TIME_AND_SALARY = '@@COMPANY/SET_TIME_AND_SALARY';
export const SET_INTERVIEW_EXPERIENCES = '@@COMPANY/SET_INTERVIEW_EXPERIENCES';
export const SET_WORK_EXPERIENCES = '@@COMPANY/SET_WORK_EXPERIENCES';
export const SET_INDEX = '@@COMPANY/SET_INDEX';
export const SET_INDEX_COUNT = '@@COMPANY/SET_INDEX_COUNT';

const setIndex = (page, box) => ({
  type: SET_INDEX,
  page,
  box,
});

const setIndexCount = box => ({
  type: SET_INDEX_COUNT,
  box,
});

export const fetchCompanyNames = ({ page, pageSize }) => async (
  dispatch,
  getState,
) => {
  const box = companyIndexesBoxSelectorAtPage(page)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setIndex(page, toFetching()));
  dispatch(setIndexCount(toFetching()));

  try {
    const data = await queryCompaniesApi({
      start: (page - 1) * pageSize,
      limit: pageSize,
    });
    dispatch(setIndex(page, getFetched(data.companiesHavingData)));
    dispatch(setIndexCount(getFetched(data.companiesHavingDataCount)));
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

const setOverview = (companyName, box) => ({
  type: SET_OVERVIEW,
  companyName,
  box,
});

export const queryCompanyOverview = companyName => async (
  dispatch,
  getState,
) => {
  const box = companyOverviewBoxSelectorByName(companyName)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setOverview(companyName, toFetching()));

  try {
    const data = await queryCompanyOverviewApi({
      companyName,
      interviewExperiencesLimit: INTERVIEW_EXPERIENCES_LIMIT,
      workExperiencesLimit: WORK_EXPERIENCES_LIMIT,
      salaryWorkTimesLimit: SALARY_WORK_TIMES_LIMIT,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverview(companyName, getFetched(data)));
    }

    const overviewData = {
      name: data.name,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
      salary_work_time_statistics: data.salary_work_time_statistics,
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setOverview(companyName, getFetched(overviewData)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setOverview(companyName, getError(error)));
    }
    throw error;
  }
};

const setTimeAndSalary = (companyName, box) => ({
  type: SET_TIME_AND_SALARY,
  companyName,
  box,
});

const setInterviewExperiences = (companyName, box) => ({
  type: SET_INTERVIEW_EXPERIENCES,
  companyName,
  box,
});

export const queryCompanyTimeAndSalary = ({
  companyName,
  jobTitle,
  start,
  limit,
}) => async (dispatch, getState) => {
  const box = companyTimeAndSalaryBoxSelectorByName(companyName)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.name === companyName &&
      box.data.jobTitle === jobTitle &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setTimeAndSalary(companyName, toFetching()));

  try {
    const data = await getCompanyTimeAndSalary({
      companyName,
      jobTitle,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setTimeAndSalary(companyName, getFetched(data)));
    }

    const timeAndSalaryData = {
      name: data.name,
      jobTitle,
      start,
      limit,
      salary_work_times: data.salaryWorkTimesResult.salaryWorkTimes,
      salary_work_times_count: data.salaryWorkTimesResult.count,
      salary_work_time_statistics: data.salary_work_time_statistics,
    };

    dispatch(setTimeAndSalary(companyName, getFetched(timeAndSalaryData)));
  } catch (error) {
    dispatch(setTimeAndSalary(companyName, getError(error)));
  }
};

export const queryCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
}) => async (dispatch, getState) => {
  const box = companyInterviewExperiencesBoxSelectorByName(companyName)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.name === companyName &&
      box.data.jobTitle === jobTitle &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setInterviewExperiences(companyName, toFetching()));

  try {
    const data = await getCompanyInterviewExperiences({
      companyName,
      jobTitle,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setInterviewExperiences(companyName, getFetched(data)));
    }

    const interviewExperiencesData = {
      name: data.name,
      jobTitle,
      start,
      limit,
      interview_experiences:
        data.interviewExperiencesResult.interviewExperiences,
      interview_experiences_count: data.interviewExperiencesResult.count,
    };

    dispatch(
      setInterviewExperiences(
        companyName,
        getFetched(interviewExperiencesData),
      ),
    );
  } catch (error) {
    dispatch(setInterviewExperiences(companyName, getError(error)));
    throw error;
  }
};

const setWorkExperiences = (companyName, box) => ({
  type: SET_WORK_EXPERIENCES,
  companyName,
  box,
});

export const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
}) => async (dispatch, getState) => {
  const box = companyWorkExperiencesBoxSelectorByName(companyName)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data.name === companyName &&
      box.data.jobTitle === jobTitle &&
      box.data.start === start &&
      box.data.limit === limit)
  ) {
    return;
  }

  dispatch(setWorkExperiences(companyName, toFetching()));

  try {
    const data = await getCompanyWorkExperiences({
      companyName,
      jobTitle,
      start,
      limit,
    });

    // Not found case
    if (data == null) {
      return dispatch(setWorkExperiences(companyName, getFetched(data)));
    }

    const workExperiencesData = {
      name: data.name,
      jobTitle,
      start,
      limit,
      work_experiences: data.workExperiencesResult.workExperiences,
      work_experiences_count: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(companyName, getFetched(workExperiencesData)));
  } catch (error) {
    dispatch(setWorkExperiences(companyName, getError(error)));
  }
};
