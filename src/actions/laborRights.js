import { entryStatusSelector } from 'selectors/laborRightsSelector';
import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import { isUnfetched as isUnfetched2 } from 'constants/status';
import { menuStateSelector } from 'selectors/laborRightsSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

export const SET_MENU = '@@LABOR_RIGHTS/SET_MENU';

export const SET_ENTRY_QUERY_START = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_START';
export const SET_ENTRY_QUERY_DONE = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_DONE';
export const SET_ENTRY_QUERY_ERROR = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_ERROR';

const setMenu = state => ({
  type: SET_MENU,
  menuState: state,
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

export const queryMenu = () => async (dispatch, getState, { api }) => {
  dispatch(setMenu(toFetching()));

  try {
    const entries = await api.laborRights.getMenuEntries();
    return dispatch(setMenu(getFetched(entries)));
  } catch (error) {
    dispatch(setMenu(getError(error)));
    throw error;
  }
};

export const queryMenuIfUnfetched = () => async (dispatch, getState) => {
  const state = menuStateSelector(getState());
  if (isUnfetched(state)) {
    return dispatch(queryMenu());
  }
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
  if (isUnfetched2(entryStatusSelector(entryId)(getState()))) {
    return dispatch(queryEntry(entryId));
  }
  return Promise.resolve();
};
