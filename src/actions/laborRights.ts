import { AnyAction } from 'redux';
import { Thunk } from 'reducers';
import { LaborRightMenuEntry, LaborRightEntry } from 'graphql/laborRight';
import {
  queryLaborRightsMenu as queryMenuApi,
  queryLaborRights as queryEntryApi,
} from 'apis/laborRightsApi';
import FetchBox, {
  getError,
  getFetched,
  toFetching,
  isUnfetched,
} from 'utils/fetchBox';
import {
  menuBoxSelector,
  entryBoxSelectorById,
} from 'selectors/laborRightsSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

export const SET_MENU = '@@LABOR_RIGHTS/SET_MENU';
export const SET_ENTRY = '@@LABOR_RIGHTS/SET_ENTRY';

const setMenu = (box: FetchBox<LaborRightMenuEntry[]>): AnyAction => ({
  type: SET_MENU,
  menu: box,
});

const setEntry = (
  entryId: string,
  box: FetchBox<LaborRightEntry | null>,
): AnyAction => ({
  type: SET_ENTRY,
  entry: box,
  entryId,
});

const queryMenu = (): Thunk => async (dispatch): Promise<AnyAction> => {
  dispatch(setMenu(toFetching()));

  try {
    const entries = await queryMenuApi();
    return dispatch(setMenu(getFetched(entries)));
  } catch (error) {
    dispatch(setMenu(getError(error)));
    throw error;
  }
};

export const queryMenuIfUnfetched = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = menuBoxSelector(getState());
  if (isUnfetched(box)) {
    return dispatch(queryMenu());
  }
};

const queryEntry = (entryId: string): Thunk => async (
  dispatch,
): Promise<unknown> => {
  dispatch(setEntry(entryId, toFetching()));

  try {
    const entry = await queryEntryApi({ entryId });
    return dispatch(setEntry(entryId, getFetched(entry)));
  } catch (error) {
    // @ts-ignore
    if (isGraphqlError('GraphqlError')) {
      return dispatch(setEntry(entryId, getError(new UiNotFoundError())));
    }

    // unexpected error
    throw error;
  }
};

export const queryEntryIfUnfetched = (entryId: string): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = entryBoxSelectorById(entryId)(getState());
  if (isUnfetched(box)) {
    return dispatch(queryEntry(entryId));
  }
};
