import { fromJS } from 'immutable';
import createReducer from 'utils/createReducer';
import {
  SET_MENU_DATA,
  SET_MENU_STATUS,
  SET_ENTRY_DATA,
  SET_ENTRY_STATUS,
} from '../actions/laborRights';
import fetchingStatus from '../constants/status';

// menuEntries: [{id, title, coverUrl}]
// entries: {id: {data, status, error}}
const preloadedState = fromJS({
  menuEntries: [],
  menuStatus: fetchingStatus.UNFETCHED,
  menuError: null,
  entries: {},
});

export default createReducer(preloadedState, {
  [SET_MENU_DATA]: (state, { entries, status, error }) =>
    state
      .set('menuEntries', fromJS(entries))
      .set('menuStatus', status)
      .set('menuError', error),
  [SET_MENU_STATUS]: (state, { status }) => state.set('menuStatus', status),
  [SET_ENTRY_DATA]: (state, { entryId, status, data, error }) =>
    state
      .setIn(['entries', entryId, 'data'], fromJS(data))
      .setIn(['entries', entryId, 'status'], status)
      .setIn(['entries', entryId, 'error'], fromJS(error)),
  [SET_ENTRY_STATUS]: (state, { entryId, status }) =>
    state.setIn(['entries', entryId, 'status'], status),
});
