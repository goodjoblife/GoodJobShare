import {
  menuStatusSelector,
  entryStatusSelector,
} from '../selectors/laborRightsSelector';
import { isUnfetched } from '../constants/status';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

export const SET_MENU_QUERY_START = '@@LABOR_RIGHTS/SET_MENU_QUERY_START';
export const SET_MENU_QUERY_DONE = '@@LABOR_RIGHTS/SET_MENU_QUERY_DONE';
export const SET_MENU_QUERY_ERROR = '@@LABOR_RIGHTS/SET_MENU_QUERY_ERROR';

export const SET_ENTRY_QUERY_START = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_START';
export const SET_ENTRY_QUERY_DONE = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_DONE';
export const SET_ENTRY_QUERY_ERROR = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_ERROR';

const setMenuQueryStart = () => ({
  type: SET_MENU_QUERY_START,
});

const setMenuQueryDone = entries => ({
  type: SET_MENU_QUERY_DONE,
  entries,
});

const setMenuQueryError = error => ({
  type: SET_MENU_QUERY_ERROR,
  error,
});

const setEntryQueryStart = entryId => ({
  type: SET_ENTRY_QUERY_START,
  entryId,
});

const setEntryQueryDone = (entryId, entry) => ({
  type: SET_ENTRY_QUERY_DONE,
  entryId,
  entry,
});

const setEntryQueryError = (entryId, error) => ({
  type: SET_ENTRY_QUERY_ERROR,
  entryId,
  error,
});

export const queryMenu = () => (dispatch, getState, { api }) => {
  dispatch(setMenuQueryStart());

  return api.laborRights
    .getMenuEntries()
    .then(entries => {
      dispatch(setMenuQueryDone(entries));
    })
    .catch(error => {
      dispatch(setMenuQueryError(error));
      throw error;
    });
};

export const queryMenuIfUnfetched = () => (dispatch, getState) => {
  if (isUnfetched(menuStatusSelector(getState()))) {
    return dispatch(queryMenu());
  }
  return Promise.resolve();
};

export const queryEntry = entryId => (dispatch, getState, { api }) => {
  dispatch(setEntryQueryStart(entryId));

  return api.laborRights
    .getEntry({ entryId })
    .then(entry => {
      dispatch(setEntryQueryDone(entryId, entry));
    })
    .catch(error => {
      if (isGraphqlError(error)) {
        return dispatch(setEntryQueryError(entryId, new UiNotFoundError()));
      }

      // unexpected error
      throw error;
    });
};

export const queryEntryIfUnfetched = entryId => (dispatch, getState) => {
  if (isUnfetched(entryStatusSelector(entryId)(getState()))) {
    return dispatch(queryEntry(entryId));
  }
  return Promise.resolve();
};
