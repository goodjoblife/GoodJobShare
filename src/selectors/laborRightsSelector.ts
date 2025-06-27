import { RootState } from 'reducers';
import { LaborRightEntry, LaborRightMenuEntry } from 'reducers/laborRights';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

export const menuBoxSelector = (
  state: RootState,
): FetchBox<LaborRightMenuEntry[]> => state.laborRights.menu;

export const entryBoxSelectorById = (entryId: string) => (
  state: RootState,
): FetchBox<LaborRightEntry> => {
  return state.laborRights.entryById[entryId] || getUnfetched();
};
