import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_PERMISSION } from '../actions/permission';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  points: 0,
  unlockedExperienceRecords: [],
  unlockedSalaryWorkTimeRecords: [],
  status: fetchingStatus.UNFETCHED,
  error: null,
});

export default createReducer(
  preloadedState,
  {
    [SET_PERMISSION]: (
      state,
      {
        points,
        unlockedExperienceRecords,
        unlockedSalaryWorkTimeRecords,
        status,
        error,
      },
    ) =>
      state
        .set('points', points)
        .set('unlockedExperienceRecords', unlockedExperienceRecords)
        .set('unlockedSalaryWorkTimeRecords', unlockedSalaryWorkTimeRecords)
        .set('status', status)
        .set('error', error),
  },
  { resetOnLogOut: true },
);
