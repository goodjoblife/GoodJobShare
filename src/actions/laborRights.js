import { entryStatusSelector } from 'selectors/laborRightsSelector';
import {
  getMenuEntries as queryMenuApi,
  getEntry as queryEntryApi,
} from 'apis/laborRightsApi';
import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import { isUnfetched as isUnfetched2 } from 'constants/status';
import { menuBoxSelector } from 'selectors/laborRightsSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

export const SET_MENU = '@@LABOR_RIGHTS/SET_MENU';

export const SET_ENTRY_QUERY_START = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_START';
export const SET_ENTRY_QUERY_DONE = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_DONE';
export const SET_ENTRY_QUERY_ERROR = '@@LABOR_RIGHTS/SET_ENTRY_QUERY_ERROR';

const setMenu = box => ({
  type: SET_MENU,
  menu: box,
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

export const queryMenu = () => async (dispatch, getState) => {
  dispatch(setMenu(toFetching()));

  try {
    const entries = await queryMenuApi();
    return dispatch(setMenu(getFetched(entries)));
  } catch (error) {
    dispatch(setMenu(getError(error)));
    throw error;
  }
};

export const queryMenuIfUnfetched = () => async (dispatch, getState) => {
  const box = menuBoxSelector(getState());
  if (isUnfetched(box)) {
    return dispatch(queryMenu());
  }
};

export const queryEntry = entryId => (dispatch, getState) => {
  dispatch(setEntryQueryStart(entryId));

  return queryEntryApi({ entryId })
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
