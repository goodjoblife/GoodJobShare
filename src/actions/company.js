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
  companyOverviewStatisticsBoxSelectorByName,
  companyTimeAndSalaryBoxSelectorByName,
  companyTimeAndSalaryStatisticsBoxSelectorByName,
  companyInterviewExperiencesBoxSelectorByName,
  companyWorkExperiencesBoxSelectorByName,
  companyRatingStatisticsBoxSelectorByName,
  companyTopNJobTitlesBoxSelectorByName,
  companyEsgSalaryDataBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import {
  queryCompanyOverview as queryCompanyOverviewApi,
  getCompanyTimeAndSalary,
  getCompanyInterviewExperiences,
  getCompanyWorkExperiences,
  queryCompaniesApi,
  getCompanyTimeAndSalaryStatistics,
  queryCompanyRatingStatisticsApi,
  getCompanyTopNJobTitles,
  getCompanyEsgSalaryData,
  queryCompanyOverviewStatistics as queryCompanyOverviewStatisticsApi,
} from 'apis/company';

export const SET_RATING_STATISTICS = '@@COMPANY/SET_RATING_STATISTICS';
export const SET_OVERVIEW = '@@COMPANY/SET_OVERVIEW';
export const SET_OVERVIEW_STATISTICS = '@@COMPANY/SET_OVERVIEW_STATISTICS';
export const SET_TIME_AND_SALARY = '@@COMPANY/SET_TIME_AND_SALARY';
export const SET_TIME_AND_SALARY_STATISTICS =
  '@@COMPANY/SET_TIME_AND_SALARY_STATISTICS';
export const SET_INTERVIEW_EXPERIENCES = '@@COMPANY/SET_INTERVIEW_EXPERIENCES';
export const SET_WORK_EXPERIENCES = '@@COMPANY/SET_WORK_EXPERIENCES';
export const SET_INDEX = '@@COMPANY/SET_INDEX';
export const SET_INDEX_COUNT = '@@COMPANY/SET_INDEX_COUNT';
export const SET_COMPANY_TOP_N_JOB_TITLES =
  '@@COMPANY/SET_COMPANY_TOP_N_JOB_TITLES';
export const SET_COMPANY_ESG_SALARY_DATA =
  '@@COMPANY/SET_COMPANY_ESG_SALARY_DATA';

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

const setRatingStatistcs = (companyName, box) => ({
  type: SET_RATING_STATISTICS,
  companyName,
  box,
});

export const queryRatingStatistics = companyName => async (
  dispatch,
  getState,
) => {
  const box = companyRatingStatisticsBoxSelectorByName(companyName)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setRatingStatistcs(companyName, toFetching()));

  try {
    const data = await queryCompanyRatingStatisticsApi({
      companyName,
    });

    // Not found case
    if (data == null) {
      return dispatch(setRatingStatistcs(companyName, getFetched(data)));
    }

    dispatch(setRatingStatistcs(companyName, getFetched(data)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setRatingStatistcs(companyName, getError(error)));
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

const setOverviewStatistics = (companyName, box) => ({
  type: SET_OVERVIEW_STATISTICS,
  companyName,
  box,
});

export const queryCompanyOverviewStatistics = companyName => async (
  dispatch,
  getState,
  { api },
) => {
  const box = companyOverviewStatisticsBoxSelectorByName(companyName)(
    getState(),
  );
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setOverviewStatistics(companyName, toFetching()));

  try {
    const data = await queryCompanyOverviewStatisticsApi({
      companyName,
    });

    // Not found case
    if (data == null) {
      return dispatch(setOverviewStatistics(companyName, getFetched(data)));
    }

    const model = {
      name: data.name,
      jobAverageSalaries:
        data.salary_work_time_statistics.job_average_salaries || [],
      averageWeekWorkTime:
        data.salary_work_time_statistics.average_week_work_time || 0,
      overtimeFrequencyCount:
        data.salary_work_time_statistics.overtime_frequency_count || 0,
    };

    dispatch(setOverviewStatistics(companyName, getFetched(model)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setOverviewStatistics(companyName, getError(error)));
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
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
    };

    dispatch(setTimeAndSalary(companyName, getFetched(timeAndSalaryData)));
  } catch (error) {
    dispatch(setTimeAndSalary(companyName, getError(error)));
  }
};

const setTimeAndSalaryStatistics = (companyName, box) => ({
  type: SET_TIME_AND_SALARY_STATISTICS,
  companyName,
  box,
});

const setCompanyTopNJobTitles = (companyName, box) => ({
  type: SET_COMPANY_TOP_N_JOB_TITLES,
  companyName,
  box,
});

export const queryCompanyTimeAndSalaryStatistics = ({ companyName }) => async (
  dispatch,
  getState,
) => {
  const box = companyTimeAndSalaryStatisticsBoxSelectorByName(companyName)(
    getState(),
  );
  if (isFetching(box) || (isFetched(box) && box.data.name === companyName)) {
    return;
  }

  dispatch(setTimeAndSalaryStatistics(companyName, toFetching()));

  try {
    const data = await getCompanyTimeAndSalaryStatistics({
      companyName,
    });

    // Not found case
    if (data == null) {
      return dispatch(
        setTimeAndSalaryStatistics(companyName, getFetched(data)),
      );
    }

    const timeAndSalaryStatisticsData = {
      name: data.name,
      salary_work_time_statistics: data.salary_work_time_statistics,
    };

    dispatch(
      setTimeAndSalaryStatistics(
        companyName,
        getFetched(timeAndSalaryStatisticsData),
      ),
    );
  } catch (error) {
    dispatch(setTimeAndSalaryStatistics(companyName, getError(error)));
  }
};

const setEsgSalaryData = (companyName, box) => ({
  type: SET_COMPANY_ESG_SALARY_DATA,
  companyName,
  box,
});

export const queryCompanyEsgSalaryData = ({ companyName }) => async (
  dispatch,
  getState,
) => {
  const box = companyEsgSalaryDataBoxSelectorByName(companyName)(getState());

  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setEsgSalaryData(companyName, toFetching()));

  try {
    const data = await getCompanyEsgSalaryData({
      companyName,
    });

    // Not found case
    if (!data) {
      return dispatch(setEsgSalaryData(companyName, getFetched()));
    }

    dispatch(setEsgSalaryData(companyName, getFetched(data)));
  } catch (error) {
    dispatch(setEsgSalaryData(companyName, getError(error)));
  }
};

export const queryCompanyTopNJobTitles = ({ companyName }) => async (
  dispatch,
  getState,
) => {
  const box = companyTopNJobTitlesBoxSelectorByName(companyName)(getState());

  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setCompanyTopNJobTitles(companyName, toFetching()));

  try {
    const data = await getCompanyTopNJobTitles({
      companyName,
    });

    // Not found case
    if (!data || !data.topNJobTitles) {
      return dispatch(setCompanyTopNJobTitles(companyName, getFetched(data)));
    }

    dispatch(
      setCompanyTopNJobTitles(companyName, getFetched(data.topNJobTitles)),
    );
  } catch (error) {
    dispatch(setCompanyTopNJobTitles(companyName, getError(error)));
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
      interviewExperiences:
        data.interviewExperiencesResult.interviewExperiences,
      interviewExperiencesCount: data.interviewExperiencesResult.count,
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
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(companyName, getFetched(workExperiencesData)));
  } catch (error) {
    dispatch(setWorkExperiences(companyName, getError(error)));
  }
};
