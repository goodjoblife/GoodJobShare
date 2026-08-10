import { LaborRightEntry } from 'apis/queryLaborRights';
import { LaborRightMenuEntry } from 'apis/queryLaborRightsMenu';
import { RootState } from 'reducers';
import FetchBox, { getUnfetched } from 'utils/fetchBox';

export const menuBoxSelector = (
  state: RootState,
): FetchBox<LaborRightMenuEntry[]> => state.laborRights.menu;

export const entryBoxSelectorById = (entryId: string) => (
  state: RootState,
): FetchBox<LaborRightEntry | null> => {
  return state.laborRights.entryById[entryId] || getUnfetched();
};
