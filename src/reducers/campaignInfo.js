import R from 'ramda';
import createReducer from 'utils/createReducer';

import { SET_LIST_DATA, SET_LIST_STATUS } from 'actions/campaignInfo';
import fetchingStatus from 'constants/status';

/*
 * entries: name ->
 *   { name, title, ... }
 *   see `src/apis/campaignInfoApi.js`
 */
const preloadedState = {
  entries: {},
  entriesStatus: fetchingStatus.UNFETCHED,
  entriesError: null,
};

const entriesFromList = R.compose(
  R.fromPairs,
  R.map(info => [info.name, info]),
);

export default createReducer(preloadedState, {
  [SET_LIST_DATA]: (state, { campaignList, status, error }) => ({
    ...state,
    entries: entriesFromList(campaignList),
    entriesStatus: status,
    entriesError: error,
  }),
  [SET_LIST_STATUS]: (state, { status }) => ({
    ...state,
    entriesStatus: status,
  }),
});
