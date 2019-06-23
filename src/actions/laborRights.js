import {
  menuStatusSelector,
  entryStatusSelector,
} from '../selectors/laborRightsSelector';
import fetchingStatus, { isUnfetched } from '../constants/status';
import { isHttpError } from 'utils/errors';

export const SET_MENU_QUERY_START = '@@LABOR_RIGHTS/SET_MENU_QUERY_START';
export const SET_MENU_QUERY_DONE = '@@LABOR_RIGHTS/SET_MENU_QUERY_DONE';
export const SET_MENU_QUERY_ERROR = '@@LABOR_RIGHTS/SET_MENU_QUERY_ERROR';

export const SET_ENTRY_STATUS = '@@LABOR_RIGHTS/SET_ENTRY_STATUS';
export const SET_ENTRY_DATA = '@@LABOR_RIGHTS/SET_ENTRY_DATA';

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

const setEntryStatus = (entryId, status) => ({
  type: SET_ENTRY_STATUS,
  entryId,
  status,
});

const setEntryData = (entryId, data, status, error = null) => ({
  type: SET_ENTRY_DATA,
  entryId,
  status,
  data,
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
  dispatch(setEntryStatus(entryId, fetchingStatus.FETCHING));

  return api.laborRights
    .getEntry({ entryId })
    .then(rawData => {
      dispatch(setEntryData(entryId, rawData, fetchingStatus.FETCHED));
    })
    .catch(error => {
      console.log(error);
      if (isHttpError(error)) {
        const { name, message, statusCode } = error;
        if (statusCode === 400) {
          // remap server 400 statusCode to 404
          return dispatch(
            setEntryData(entryId, {}, fetchingStatus.ERROR, {
              name,
              message,
              statusCode: 404,
            }),
          );
        }
      }
      // unexpected error
      throw error;
    });
};

export const queryEntryIfUnfetched = entryId => (dispatch, getState) => {
  if (entryStatusSelector(entryId)(getState()) === fetchingStatus.UNFETCHED) {
    return dispatch(queryEntry(entryId));
  }
  return Promise.resolve();
};
