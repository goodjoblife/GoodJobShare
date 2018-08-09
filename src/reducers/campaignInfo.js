import R from 'ramda';
import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';

import { SET_LIST_DATA, SET_LIST_STATUS } from '../actions/campaignInfo';
import fetchingStatus from '../constants/status';

const preloadedState = fromJS({
  entries: {},
  entriesStatus: fetchingStatus.UNFETCHED,
  entriesError: null,
});

const entriesFromList = R.compose(
  fromJS,
  R.fromPairs,
  R.map(info => [info.name, info])
);

export default createReducer(preloadedState, {
  [SET_LIST_DATA]: (state, { campaignList, status, error }) =>
    state
      .set('entries', entriesFromList(campaignList))
      .set('entriesStatus', status)
      .set('entriesError', error),
  [SET_LIST_STATUS]: (state, { status }) => state.set('entriesStatus', status),
});
