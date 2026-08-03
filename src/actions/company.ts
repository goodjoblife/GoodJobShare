import R from 'ramda';
import { AnyAction } from 'redux';

import { AspectStatisticsData } from 'apis/aspectRatingStatistics';
import queryCompaniesApi, { CompanyInIndex } from 'apis/queryCompanies';
import queryCompanyAspectRatingStatisticsApi from 'apis/queryCompanyAspectRatingStatistics';
import queryCompanyEsgSalaryDataApi, {
  ESGSalaryData,
} from 'apis/queryCompanyEsgSalaryData';
import queryCompanyInterviewExperiencesApi from 'apis/queryCompanyInterviewExperiences';
import queryCompanyIsSubscribedApi, {
  CompanyIsSubscribed,
} from 'apis/queryCompanyIsSubscribed';
import queryCompanyOverviewApi from 'apis/queryCompanyOverview';
import queryCompanyOverviewStatisticsApi from 'apis/queryCompanyOverviewStatistics';
import queryCompanyRatingStatisticsApi, {
  RatingStatistics,
} from 'apis/queryCompanyRatingStatistics';
import queryCompanySalaryWorkTimeApi from 'apis/queryCompanySalaryWorkTime';
import queryCompanySalaryWorkTimeStatisticsApi from 'apis/queryCompanySalaryWorkTimeStatistics';
import queryCompanyTopNJobTitlesApi, {
  TopNJobTitles,
} from 'apis/queryCompanyTopNJobTitles';
import queryCompanyWorkExperiencesApi from 'apis/queryCompanyWorkExperiences';
import {
  DataTimeRange,
  ExperienceInYearRange,
  OvertimeStats,
} from 'apis/salaryWorkTime';
import subscribeCompanyApi from 'apis/subscribeCompany';
import unsubscribeCompanyApi from 'apis/unsubscribeCompany';
import { Aspect } from 'constants/companyJobTitle';
import { Thunk } from 'reducers';
import {
  CompanyAspectExperienceResult,
  CompanyInterviewExperienceResult,
  CompanyOverview,
  CompanyOverviewStatistics,
  CompanySalaryWorkTimeResult,
  CompanyWorkExperienceResult,
} from 'reducers/companyIndex';
import { tokenSelector } from 'selectors/authSelector';
import {
  companyEsgSalaryDataBoxSelectorByName,
  companyIndexesBoxSelectorAtPage,
  companyInterviewExperiencesBoxSelectorByName,
  companyIsSubscribedBoxSelectorByName,
  companyOverviewBoxSelectorByName,
  companyOverviewStatisticsBoxSelectorByName,
  companyRatingStatisticsBoxSelectorByName,
  companySalaryWorkTimeBoxSelectorByName,
  companySalaryWorkTimeStatisticsBoxSelectorByName,
  companyTopNJobTitlesBoxSelectorByName,
  companyWorkExperiencesAspectExperiencesBoxSelectorByName,
  companyWorkExperiencesAspectStatisticsBoxSelectorByName,
  companyWorkExperiencesBoxSelectorByName,
} from 'selectors/companyAndJobTitle';
import { isGraphqlError } from 'utils/errors';
import FetchBox, {
  getError,
  getFetched,
  isFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

import { setExperience } from './experience';

export const SET_RATING_STATISTICS = '@@COMPANY/SET_RATING_STATISTICS';
export const SET_OVERVIEW = '@@COMPANY/SET_OVERVIEW';
export const SET_OVERVIEW_STATISTICS = '@@COMPANY/SET_OVERVIEW_STATISTICS';
export const SET_SALARY_WORK_TIME = '@@COMPANY/SET_SALARY_WORK_TIME';
export const SET_SALARY_WORK_TIME_STATISTICS =
  '@@COMPANY/SET_SALARY_WORK_TIME_STATISTICS';
export const SET_INTERVIEW_EXPERIENCES = '@@COMPANY/SET_INTERVIEW_EXPERIENCES';
export const SET_WORK_EXPERIENCES = '@@COMPANY/SET_WORK_EXPERIENCES';
export const SET_WORK_EXPERIENCES_ASPECT_STATISTICS =
  '@@COMPANY/SET_WORK_EXPERIENCES_ASPECT_STATISTICS';
export const SET_WORK_EXPERIENCES_ASPECT_EXPERIENCES =
  '@@COMPANY/SET_WORK_EXPERIENCES_ASPECT_EXPERIENCES';
export const SET_INDEX = '@@COMPANY/SET_INDEX';
export const SET_INDEX_COUNT = '@@COMPANY/SET_INDEX_COUNT';
export const SET_COMPANY_TOP_N_JOB_TITLES =
  '@@COMPANY/SET_COMPANY_TOP_N_JOB_TITLES';
export const SET_COMPANY_ESG_SALARY_DATA =
  '@@COMPANY/SET_COMPANY_ESG_SALARY_DATA';
export const SET_IS_SUBSCRIBED = '@@COMPANY/SET_IS_SUBSCRIBED';

const setIndex = (
  page: number,
  box: FetchBox<CompanyInIndex[]>,
): AnyAction => ({
  type: SET_INDEX,
  page,
  box,
});

const setIndexCount = (box: FetchBox<number>): AnyAction => ({
  type: SET_INDEX_COUNT,
  box,
});

export const fetchCompanyNames = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
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

const setRatingStatistcs = (
  companyName: string,
  box: FetchBox<RatingStatistics | null>,
): AnyAction => ({
  type: SET_RATING_STATISTICS,
  companyName,
  box,
});

export const queryRatingStatistics = (companyName: string): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
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

const setOverview = (
  companyName: string,
  box: FetchBox<CompanyOverview | null>,
): AnyAction => ({
  type: SET_OVERVIEW,
  companyName,
  box,
});

export const queryCompanyOverview = (
  companyName: string,
  { force = false }: { force?: boolean } = {},
): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyOverviewBoxSelectorByName(companyName)(getState());
  if (!force && (isFetching(box) || isFetched(box))) {
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

    const overviewData: CompanyOverview = {
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

const setOverviewStatistics = (
  companyName: string,
  box: FetchBox<CompanyOverviewStatistics | null>,
): AnyAction => ({
  type: SET_OVERVIEW_STATISTICS,
  companyName,
  box,
});

export const queryCompanyOverviewStatistics = (
  companyName: string,
): Thunk => async (dispatch, getState): Promise<unknown> => {
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

    const model: CompanyOverviewStatistics = {
      jobAverageSalaries:
        data.salary_work_time_statistics.job_average_salaries || [],
      averageWeekWorkTime:
        data.salary_work_time_statistics.average_week_work_time || 0,
      overtimeFrequencyCount:
        data.salary_work_time_statistics.overtime_frequency_count,
    };

    dispatch(setOverviewStatistics(companyName, getFetched(model)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setOverviewStatistics(companyName, getError(error)));
    }
    throw error;
  }
};

const setSalaryWorkTime = (
  companyName: string,
  box: FetchBox<CompanySalaryWorkTimeResult | null>,
): AnyAction => ({
  type: SET_SALARY_WORK_TIME,
  companyName,
  box,
});

const setInterviewExperiences = (
  companyName: string,
  box: FetchBox<CompanyInterviewExperienceResult | null>,
): AnyAction => ({
  type: SET_INTERVIEW_EXPERIENCES,
  companyName,
  box,
});

export const queryCompanySalaryWorkTime = (
  {
    companyName,
    jobTitle,
    start,
    limit,
    dataTimeRange,
    experienceInYearRange,
    gender,
    sortBy,
  }: {
    companyName: string;
    jobTitle?: string;
    start: number;
    limit: number;
    dataTimeRange?: DataTimeRange;
    experienceInYearRange?: ExperienceInYearRange;
    gender?: string;
    sortBy?: string;
  },
  { force = false }: { force?: boolean } = {},
): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companySalaryWorkTimeBoxSelectorByName(companyName)(getState());
  if (
    !force &&
    (isFetching(box) ||
      (isFetched(box) &&
        box.data &&
        box.data.name === companyName &&
        box.data.jobTitle === jobTitle &&
        box.data.start === start &&
        box.data.limit === limit &&
        R.equals(box.data.dataTimeRange, dataTimeRange) &&
        R.equals(box.data.experienceInYearRange, experienceInYearRange) &&
        box.data.gender === gender &&
        box.data.sortBy === sortBy))
  ) {
    return;
  }

  dispatch(setSalaryWorkTime(companyName, toFetching(box)));

  try {
    const data = await queryCompanySalaryWorkTimeApi({
      companyName,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setSalaryWorkTime(companyName, getFetched(data)));
    }

    const salaryWorkTimeData: CompanySalaryWorkTimeResult = {
      name: data.name,
      jobTitle,
      start,
      limit,
      dataTimeRange,
      experienceInYearRange,
      gender,
      sortBy,
      salaryWorkTimes: data.salaryWorkTimesResult.salaryWorkTimes,
      salaryWorkTimesCount: data.salaryWorkTimesResult.count,
    };

    dispatch(setSalaryWorkTime(companyName, getFetched(salaryWorkTimeData)));
  } catch (error) {
    dispatch(setSalaryWorkTime(companyName, getError(error)));
  }
};

const setSalaryWorkTimeStatistics = (
  companyName: string,
  box: FetchBox<OvertimeStats | null>,
): AnyAction => ({
  type: SET_SALARY_WORK_TIME_STATISTICS,
  companyName,
  box,
});

const setCompanyTopNJobTitles = (
  companyName: string,
  box: FetchBox<TopNJobTitles | null>,
): AnyAction => ({
  type: SET_COMPANY_TOP_N_JOB_TITLES,
  companyName,
  box,
});

export const queryCompanySalaryWorkTimeStatistics = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companySalaryWorkTimeStatisticsBoxSelectorByName(companyName)(
    getState(),
  );
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setSalaryWorkTimeStatistics(companyName, toFetching(box)));

  try {
    const data = await queryCompanySalaryWorkTimeStatisticsApi({
      companyName,
    });

    dispatch(setSalaryWorkTimeStatistics(companyName, getFetched(data)));
  } catch (error) {
    dispatch(setSalaryWorkTimeStatistics(companyName, getError(error)));
  }
};

const setEsgSalaryData = (
  companyName: string,
  box: FetchBox<ESGSalaryData | null>,
): AnyAction => ({
  type: SET_COMPANY_ESG_SALARY_DATA,
  companyName,
  box,
});

export const queryCompanyEsgSalaryData = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyEsgSalaryDataBoxSelectorByName(companyName)(getState());

  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setEsgSalaryData(companyName, toFetching()));

  try {
    const data = await queryCompanyEsgSalaryDataApi({
      companyName,
    });

    // Not found case
    if (!data) {
      return dispatch(setEsgSalaryData(companyName, getFetched(null)));
    }

    dispatch(setEsgSalaryData(companyName, getFetched(data)));
  } catch (error) {
    dispatch(setEsgSalaryData(companyName, getError(error)));
  }
};

export const queryCompanyTopNJobTitles = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyTopNJobTitlesBoxSelectorByName(companyName)(getState());

  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setCompanyTopNJobTitles(companyName, toFetching()));

  try {
    const data = await queryCompanyTopNJobTitlesApi({
      companyName,
    });

    // Not found case
    if (!data || !data.topNJobTitles) {
      return dispatch(setCompanyTopNJobTitles(companyName, getFetched(null)));
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
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyInterviewExperiencesBoxSelectorByName(companyName)(
    getState(),
  );
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.name === companyName &&
      box.data.jobTitle === jobTitle &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setInterviewExperiences(companyName, toFetching(box)));

  try {
    const data = await queryCompanyInterviewExperiencesApi({
      companyName,
      jobTitle,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setInterviewExperiences(companyName, getFetched(data)));
    }

    const interviewExperiencesData: CompanyInterviewExperienceResult = {
      name: data.name,
      jobTitle,
      start,
      limit,
      sortBy,
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

    // Update state.experiences which is the source of truth for all experiences
    data.interviewExperiencesResult.interviewExperiences.forEach(e => {
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setInterviewExperiences(companyName, getError(error)));
    throw error;
  }
};

const setWorkExperiences = (
  companyName: string,
  box: FetchBox<CompanyWorkExperienceResult | null>,
): AnyAction => ({
  type: SET_WORK_EXPERIENCES,
  companyName,
  box,
});

export const queryCompanyWorkExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}: {
  companyName: string;
  jobTitle?: string;
  start: number;
  limit: number;
  sortBy?: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyWorkExperiencesBoxSelectorByName(companyName)(getState());
  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.name === companyName &&
      box.data.jobTitle === jobTitle &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.sortBy === sortBy)
  ) {
    return;
  }

  dispatch(setWorkExperiences(companyName, toFetching(box)));

  try {
    const data = await queryCompanyWorkExperiencesApi({
      companyName,
      jobTitle,
      start,
      limit,
      sortBy,
    });

    // Not found case
    if (data == null) {
      return dispatch(setWorkExperiences(companyName, getFetched(data)));
    }

    const workExperiencesData: CompanyWorkExperienceResult = {
      name: data.name,
      jobTitle,
      start,
      limit,
      sortBy,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(setWorkExperiences(companyName, getFetched(workExperiencesData)));

    // Update state.experiences which is the source of truth for all experiences
    data.workExperiencesResult.workExperiences.forEach(e => {
      dispatch(setExperience(e.id, getFetched(e)));
    });
  } catch (error) {
    dispatch(setWorkExperiences(companyName, getError(error)));
  }
};

const setWorkExperiencesAspectStatistics = (
  companyName: string,
  box: FetchBox<AspectStatisticsData | null>,
): AnyAction => ({
  type: SET_WORK_EXPERIENCES_ASPECT_STATISTICS,
  companyName,
  box,
});

export const queryCompanyWorkExperiencesAspectStatistics = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyWorkExperiencesAspectStatisticsBoxSelectorByName(
    companyName,
  )(getState());

  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setWorkExperiencesAspectStatistics(companyName, toFetching(box)));

  try {
    const data = await queryCompanyAspectRatingStatisticsApi({
      companyName,
    });
    dispatch(setWorkExperiencesAspectStatistics(companyName, getFetched(data)));
  } catch (error) {
    dispatch(setWorkExperiencesAspectStatistics(companyName, getError(error)));
  }
};

const setWorkExperiencesAspectExperiences = (
  companyName: string,
  box: FetchBox<CompanyAspectExperienceResult | null>,
): AnyAction => ({
  type: SET_WORK_EXPERIENCES_ASPECT_EXPERIENCES,
  companyName,
  box,
});

export const queryCompanyWorkExperiencesAspectExperiences = ({
  companyName,
  aspect,
  rating,
  start,
  limit,
}: {
  companyName: string;
  aspect: Aspect;
  rating: number | null;
  start: number;
  limit: number;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyWorkExperiencesAspectExperiencesBoxSelectorByName(
    companyName,
  )(getState());

  if (
    isFetching(box) ||
    (isFetched(box) &&
      box.data &&
      box.data.name === companyName &&
      box.data.rating === rating &&
      box.data.start === start &&
      box.data.limit === limit &&
      box.data.aspect === aspect)
  ) {
    return;
  }

  dispatch(setWorkExperiencesAspectExperiences(companyName, toFetching(box)));

  try {
    const data = await queryCompanyWorkExperiencesApi({
      companyName,
      start,
      limit,
      aspectFilter: {
        aspect,
        rating: rating === null ? undefined : rating,
      },
    });

    // Not found case
    if (data === null) {
      return dispatch(
        setWorkExperiencesAspectExperiences(companyName, getFetched(data)),
      );
    }

    const workExperiencesAspectExperiencesData: CompanyAspectExperienceResult = {
      name: companyName,
      aspect,
      rating,
      start,
      limit,
      workExperiences: data.workExperiencesResult.workExperiences,
      workExperiencesCount: data.workExperiencesResult.count,
    };

    dispatch(
      setWorkExperiencesAspectExperiences(
        companyName,
        getFetched(workExperiencesAspectExperiencesData),
      ),
    );
  } catch (error) {
    dispatch(setWorkExperiencesAspectExperiences(companyName, getError(error)));
  }
};

const setIsSubscribed = (
  companyName: string,
  box: FetchBox<CompanyIsSubscribed>,
): AnyAction => ({
  type: SET_IS_SUBSCRIBED,
  companyName,
  box,
});

const subscribeCompany = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const token = tokenSelector(state);
  const box = companyIsSubscribedBoxSelectorByName(companyName)(state);
  if (!isFetched(box) || !box.data) {
    return;
  }
  const { companyId } = box.data;
  if (!companyId) {
    return;
  }

  dispatch(
    setIsSubscribed(
      companyName,
      getFetched({
        isSubscribed: true,
        companyId,
      }),
    ),
  );
  try {
    const success = await subscribeCompanyApi({
      companyId,
      token,
    });

    if (!success) {
      dispatch(
        setIsSubscribed(
          companyName,
          getFetched({
            isSubscribed: false,
            companyId,
          }),
        ),
      );
    }
  } catch (error) {
    dispatch(
      setIsSubscribed(
        companyName,
        getFetched({
          isSubscribed: false,
          companyId,
        }),
      ),
    );
    throw error;
  }
};

const unsubscribeCompany = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const token = tokenSelector(state);
  const box = companyIsSubscribedBoxSelectorByName(companyName)(state);
  if (!isFetched(box) || !box.data) {
    return;
  }
  const { companyId } = box.data;
  if (!companyId) {
    return;
  }

  dispatch(
    setIsSubscribed(
      companyName,
      getFetched({
        isSubscribed: false,
        companyId,
      }),
    ),
  );
  try {
    const success = await unsubscribeCompanyApi({
      companyId,
      token,
    });

    if (!success) {
      dispatch(
        setIsSubscribed(
          companyName,
          getFetched({
            isSubscribed: true,
            companyId,
          }),
        ),
      );
    }
  } catch (error) {
    dispatch(
      setIsSubscribed(
        companyName,
        getFetched({
          isSubscribed: true,
          companyId,
        }),
      ),
    );
    throw error;
  }
};

export const toggleSubscribeCompany = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const state = getState();
  const box = companyIsSubscribedBoxSelectorByName(companyName)(state);
  if (!isFetched(box) || !box.data) {
    return;
  }
  const { isSubscribed } = box.data;

  if (isSubscribed) {
    await dispatch(unsubscribeCompany({ companyName }));
  } else {
    await dispatch(subscribeCompany({ companyName }));
  }
};

export const queryCompanyIsSubscribed = ({
  companyName,
}: {
  companyName: string;
}): Thunk => async (dispatch, getState): Promise<unknown> => {
  const box = companyIsSubscribedBoxSelectorByName(companyName)(getState());
  if (isFetching(box) || isFetched(box)) {
    return;
  }

  dispatch(setIsSubscribed(companyName, toFetching()));

  try {
    const state = getState();
    const token = tokenSelector(state);
    const data = await queryCompanyIsSubscribedApi({ companyName, token });

    dispatch(setIsSubscribed(companyName, getFetched(data)));
  } catch (error) {
    if (isGraphqlError(error)) {
      dispatch(setIsSubscribed(companyName, getError(error)));
    }
    throw error;
  }
};
