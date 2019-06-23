import createReducer from 'utils/createReducer';
import {
  SET_MENU_QUERY_START,
  SET_MENU_QUERY_DONE,
  SET_MENU_QUERY_ERROR,
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
  [SET_MENU_QUERY_START]: state => ({
    ...state,
    menuEntries: [],
    menuStatus: fetchingStatus.FETCHING,
    menuError: null,
  }),
  [SET_MENU_QUERY_DONE]: (state, { entries }) => ({
    ...state,
    menuEntries: entries,
    menuStatus: fetchingStatus.FETCHED,
    menuError: null,
  }),
  [SET_MENU_QUERY_ERROR]: (state, { error }) => ({
    ...state,
    menuEntries: [],
    menuStatus: fetchingStatus.ERROR,
    menuError: error,
  }),

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
