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
const preloadedState = {
  menuEntries: [],
  menuStatus: fetchingStatus.UNFETCHED,
  menuError: null,
  entries: {},
};

export default createReducer(preloadedState, {
  [SET_MENU_DATA]: (state, { entries, status, error }) => ({
    ...state,
    menuEntries: entries,
    menuStatus: status,
    menuError: error,
  }),
  [SET_MENU_STATUS]: (state, { status }) => ({ ...state, menuStatus: status }),
  [SET_ENTRY_DATA]: (state, { entryId, status, data, error }) => {
    const entries = state.entries;
    const newEntry = {
      data,
      status,
      error,
    };
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: newEntry,
      },
    };
  },
  [SET_ENTRY_STATUS]: (state, { entryId, status }) => {
    const entries = state.entries;
    const newEntry = {
      ...state.entries[entryId],
      status,
    };
    return {
      ...state,
      entries: {
        ...entries,
        [entryId]: newEntry,
      },
    };
  },
});
