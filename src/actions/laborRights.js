import { getEntries, getEntry } from '../apis/laborRightsApi';
import {
  menuStatusSelector,
  entryStatusSelector,
} from '../selectors/laborRightsSelector';
import fetchingStatus from '../constants/status';
import { isHttpError } from 'utils/errors';

export const SET_MENU_STATUS = '@@LABOR_RIGHTS/SET_MENU_STATUS';
export const SET_MENU_DATA = '@@LABOR_RIGHTS/SET_MENU_DATA';
export const SET_ENTRY_STATUS = '@@LABOR_RIGHTS/SET_ENTRY_STATUS';
export const SET_ENTRY_DATA = '@@LABOR_RIGHTS/SET_ENTRY_DATA';

const setMenuData = (entries, status, error = null) => ({
  type: SET_MENU_DATA,
  entries,
  status,
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

export const queryMenu = () => dispatch => {
  dispatch({
    type: SET_MENU_STATUS,
    status: fetchingStatus.FETCHING,
  });

  return getEntries()
    .then(rawData => {
      dispatch(setMenuData(rawData, fetchingStatus.FETCHED));
    })
    .catch(error => {
      dispatch(setMenuData([], fetchingStatus.ERROR, error));
    });
};

export const queryMenuIfUnfetched = () => (dispatch, getState) => {
  if (menuStatusSelector(getState()) === fetchingStatus.UNFETCHED) {
    return dispatch(queryMenu());
  }
  return Promise.resolve();
};

export const queryEntry = entryId => dispatch => {
  dispatch(setEntryStatus(entryId, fetchingStatus.FETCHING));

  return getEntry({ entryId })
    .then(rawData => {
      dispatch(setEntryData(entryId, rawData, fetchingStatus.FETCHED));
    })
    .catch(error => {
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
