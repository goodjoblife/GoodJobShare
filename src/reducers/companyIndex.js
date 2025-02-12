import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
  SET_WORK_EXPERIENCES,
  SET_TIME_AND_SALARY_STATISTICS,
  SET_RATING_STATISTICS,
  SET_COMPANY_TOP_N_JOB_TITLES,
  SET_COMPANY_ESG_SALARY_DATA,
} from 'actions/company';

const preloadedState = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> box
  ratingStatisticsByName: {},
  overviewByName: {},
  timeAndSalaryByName: {},
  timeAndSalaryStatisticsByName: {},
  interviewExperiencesByName: {},
  workExperiencesByName: {},
  // companyName --> box
  // box.data: null | {all, interview, work, salary}
  topNJobTitlesByName: {},
  esgSalaryData: {},
};

const reducer = createReducer(preloadedState, {
  [SET_INDEX_COUNT]: (state, { box }) => ({
    ...state,
    indexCountBox: box,
  }),
  [SET_INDEX]: (state, { page, box }) => {
    return {
      ...state,
      indexesByPage: {
        ...state.indexesByPage,
        [page]: box,
      },
    };
  },
  [SET_RATING_STATISTICS]: (state, { companyName, box }) => {
    return {
      ...state,
      ratingStatisticsByName: {
        ...state.ratingStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_OVERVIEW]: (state, { companyName, box }) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [companyName]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY]: (state, { companyName, box }) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [companyName]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY_STATISTICS]: (state, { companyName, box }) => {
    return {
      ...state,
      timeAndSalaryStatisticsByName: {
        ...state.timeAndSalaryStatisticsByName,
        [companyName]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (state, { companyName, box }) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_WORK_EXPERIENCES]: (state, { companyName, box }) => {
    return {
      ...state,
      workExperiencesByName: {
        ...state.workExperiencesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_TOP_N_JOB_TITLES]: (state, { companyName, box }) => {
    return {
      ...state,
      topNJobTitlesByName: {
        ...state.topNJobTitlesByName,
        [companyName]: box,
      },
    };
  },
  [SET_COMPANY_ESG_SALARY_DATA]: (state, { companyName, box }) => {
    return {
      ...state,
      esgSalaryData: {
        ...state.esgSalaryData,
        [companyName]: box,
      },
    };
  },
});

export default reducer;
