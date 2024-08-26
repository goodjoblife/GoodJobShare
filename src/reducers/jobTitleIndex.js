import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_TIME_AND_SALARY,
  SET_INTERVIEW_EXPERIENCES,
} from 'actions/jobTitle';

const preloadedState = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // jobTitle --> overviewBox
  overviewByName: {},
  timeAndSalaryByName: {},
  interviewExperiencesByName: {},
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
  [SET_OVERVIEW]: (state, { jobTitle, box }) => {
    return {
      ...state,
      overviewByName: {
        ...state.overviewByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_TIME_AND_SALARY]: (state, { jobTitle, box }) => {
    return {
      ...state,
      timeAndSalaryByName: {
        ...state.timeAndSalaryByName,
        [jobTitle]: box,
      },
    };
  },
  [SET_INTERVIEW_EXPERIENCES]: (state, { jobTitle, box }) => {
    return {
      ...state,
      interviewExperiencesByName: {
        ...state.interviewExperiencesByName,
        [jobTitle]: box,
      },
    };
  },
});

export default reducer;
