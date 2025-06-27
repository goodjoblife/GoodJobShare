import { RootState } from 'reducers';
import { LaborRightMenuEntry, LaborRightEntry } from 'apis/laborRightsApi';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

export const menuBoxSelector = (
  state: RootState,
): FetchBox<LaborRightMenuEntry[]> => state.laborRights.menu;

export const entryBoxSelectorById = (entryId: string) => (
  state: RootState,
): FetchBox<LaborRightEntry> => {
  return state.laborRights.entryById[entryId] || getUnfetched();
};
