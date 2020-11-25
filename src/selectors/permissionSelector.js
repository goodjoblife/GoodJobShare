import R from 'ramda';

import { isFetched } from '../constants/status';

export const myPointsSelector = state => state.permission.get('points');

export const myUnlockedExperienceRecordsSelector = state =>
  state.permission.get('unlockedExperienceRecords');

export const myUnlockedSalaryWorkTimeRecordsSelector = state =>
  state.permission.get('unlockedSalaryWorkTimeRecords');

export const hasFetchedMyUnlockedContentSelector = R.compose(
  isFetched,
  state => state.permission.get('status'),
);
