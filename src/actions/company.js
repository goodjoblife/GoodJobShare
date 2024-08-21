import { isGraphqlError } from 'utils/errors';
import STATUS from 'constants/status';
import {
  isFetching,
  isFetched,
  toFetching,
  getFetched,
  getError,
} from 'utils/fetchBox';
import {
  companyStatus as companyStatusSelector,
  companyIndexesBoxSelectorAtPage,
  companyOverviewBoxSelectorByName,
  companyTimeAndSalaryBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { getCompany as getCompanyApi, queryCompaniesApi } from 'apis/company';

export const SET_STATUS = '@@company/SET_STATUS';
export const SET_OVERVIEW = '@@COMPANY/SET_OVERVIEW';
export const SET_TIME_AND_SALARY = '@@COMPANY/SET_TIME_AND_SALARY';
export const SET_INDEX = '@@COMPANY/SET_INDEX';
export const SET_INDEX_COUNT = '@@COMPANY/SET_INDEX_COUNT';

const setStatus = (companyName, status, data = null, error = null) => ({
  type: SET_STATUS,
  companyName,
  status,
  data,
  error,
});

export const fetchCompany = companyName => (dispatch, getState) => {
  const status = companyStatusSelector(companyName)(getState());
  if (status === STATUS.FETCHING || status === STATUS.FETCHED) {
    return;
  }

  dispatch(setStatus(companyName, STATUS.FETCHING));

  return getCompanyApi(companyName)
    .then(data => {
      dispatch(setStatus(companyName, STATUS.FETCHED, data));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        dispatch(setStatus(companyName, STATUS.ERROR, null, error));
      } else {
        // Unexpected error
        throw error;
      }
    });
};

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
    // TODO: rewrite to use api with pagination
    const data = await getCompanyApi(companyName);

    // Not found case
    if (data == null) {
      return dispatch(setOverview(companyName, getFetched(data)));
    }

    const overviewData = {
      name: data.name,
      salaryWorkTimes: data.salary_work_times.slice(0, SALARY_WORK_TIMES_LIMIT),
      salaryWorkTimesCount: data.salary_work_times.length,
      salary_work_time_statistics: data.salary_work_time_statistics,
      interviewExperiences: data.interview_experiences.slice(
        0,
        INTERVIEW_EXPERIENCES_LIMIT,
      ),
      interviewExperiencesCount: data.interview_experiences.length,
      workExperiences: data.work_experiences.slice(0, WORK_EXPERIENCES_LIMIT),
      workExperiencesCount: data.work_experiences.length,
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

export const queryCompanyTimeAndSalary = companyName => async (
  dispatch,
  getState,
) => {
  const box = companyTimeAndSalaryBoxSelectorByName(companyName)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setTimeAndSalary(companyName, toFetching()));

  try {
    const data = await getCompanyApi(companyName);

    // Not found case
    if (data == null) {
      return dispatch(setTimeAndSalary(companyName, getFetched(data)));
    }

    const timeAndSalaryData = {
      name: data.name,
      salary_work_times: data.salary_work_times.slice(
        0,
        SALARY_WORK_TIMES_LIMIT,
      ),
      salary_work_times_count: data.salary_work_times.length,
      salary_work_time_statistics: data.salary_work_time_statistics,
    };

    dispatch(setTimeAndSalary(companyName, getFetched(timeAndSalaryData)));
  } catch (error) {
    dispatch(setTimeAndSalary(companyName, getError(error)));
  }
};
