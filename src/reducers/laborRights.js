import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';
import {
  SET_ENTRY_QUERY_START,
  SET_ENTRY_QUERY_DONE,
  SET_ENTRY_QUERY_ERROR,
  SET_MENU,
} from 'actions/laborRights';
import fetchingStatus from 'constants/status';

// menuEntries: [{id, title, coverUrl}]
// entries: {id: {data, status, error}}
const preloadedState = {
  menuEntries: [],
  menuStatus: fetchingStatus.UNFETCHED,
  menuError: null,
  entries: {},
  menuState: getUnfetched(),
};

export default createReducer(
  preloadedState,
  {
    [SET_ENTRY_QUERY_START]: (state, { entryId }) => {
      const entries = state.entries;
      const newEntry = {
        data: null,
        status: fetchingStatus.FETCHING,
        error: null,
      };
      return {
        ...state,
        entries: {
          ...entries,
          [entryId]: newEntry,
        },
      };
    },
    [SET_ENTRY_QUERY_DONE]: (state, { entryId, entry }) => {
      const entries = state.entries;
      const newEntry = {
        data: entry,
        status: fetchingStatus.FETCHED,
        error: null,
      };
      return {
        ...state,
        entries: {
          ...entries,
          [entryId]: newEntry,
        },
      };
    },
    [SET_ENTRY_QUERY_ERROR]: (state, { entryId, error }) => {
      const entries = state.entries;
      const newEntry = {
        data: null,
        status: fetchingStatus.ERROR,
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
    [SET_MENU]: (state, { menuState }) => ({
      ...state,
      menuState,
    }),
  },
  { resetOnLogOut: false },
);
