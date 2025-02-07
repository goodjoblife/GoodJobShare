import {
  queryLaborRightMenu as queryLaborRightMenuApi,
  queryLaborRight as queryLaborRightApi,
} from 'apis/laborRightsApi';
import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import {
  menuBoxSelector,
  entryBoxSelectorById,
} from 'selectors/laborRightsSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

export const SET_MENU = '@@LABOR_RIGHTS/SET_MENU';
export const SET_ENTRY = '@@LABOR_RIGHTS/SET_ENTRY';

const setMenu = box => ({
  type: SET_MENU,
  menu: box,
});

const setEntry = (entryId, box) => ({
  type: SET_ENTRY,
  entry: box,
  entryId,
});

const queryMenu = () => async (dispatch, getState) => {
  dispatch(setMenu(toFetching()));

  try {
    const entries = await queryLaborRightMenuApi();
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

const queryEntry = entryId => async (dispatch, getState) => {
  dispatch(setEntry(entryId, toFetching()));

  try {
    const entry = await queryLaborRightApi({ entryId });
    return dispatch(setEntry(entryId, getFetched(entry)));
  } catch (error) {
    if (isGraphqlError(error)) {
      return dispatch(setEntry(entryId, getError(new UiNotFoundError())));
    }

    // unexpected error
    throw error;
  }
};

export const queryEntryIfUnfetched = entryId => async (dispatch, getState) => {
  const box = entryBoxSelectorById(entryId)(getState());
  if (isUnfetched(box)) {
    return dispatch(queryEntry(entryId));
  }
};
