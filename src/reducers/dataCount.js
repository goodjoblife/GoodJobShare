import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import {
  SET_TIME_AND_SALARY_COUNT,
  SET_LABOR_RIGHTS_COUNT,
} from '../actions/dataCount';

const preloadedState = fromJS({
  timeAndSalaryCount: 0,
  laborRightsCount: 0,
  hasFetchedTimeAndSalaryCount: false,
  hasFetchedLaborRightsCount: false,
  getTimeAndSalaryError: null,
  getLaborRightsError: null,
});

export default createReducer(preloadedState, {
  [SET_TIME_AND_SALARY_COUNT]: (state, { count, hasFetched, err }) =>
    state
      .set('timeAndSalaryCount', count)
      .set('hasFetchedTimeAndSalaryCount', hasFetched)
      .set('getTimeAndSalaryError', err),

  [SET_LABOR_RIGHTS_COUNT]: (state, { count, hasFetched, err }) =>
    state
      .set('laborRightsCount', count)
      .set('hasFetchedLaborRightsCount', hasFetched)
      .set('getLaborRightsError', err),
});
