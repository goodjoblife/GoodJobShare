import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import {
  SET_INDEX_COUNT,
  SET_INDEX,
  SET_OVERVIEW,
  SET_TIME_AND_SALARY,
} from 'actions/company';

const preloadedState = {
  // page --> indexBox
  indexesByPage: {},
  indexCountBox: getUnfetched(),
  // companyName --> overviewBox
  overviewByName: {},
  timeAndSalaryByName: {},
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
});

export default reducer;
