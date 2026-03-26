import { RootState } from 'reducers';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { LaborRightMenuEntry, LaborRightEntry } from 'graphql/laborRight';

export const menuBoxSelector = (
  state: RootState,
): FetchBox<LaborRightMenuEntry[]> => state.laborRights.menu;

export const entryBoxSelectorById = (entryId: string) => (
  state: RootState,
): FetchBox<LaborRightEntry | null> => {
  return state.laborRights.entryById[entryId] || getUnfetched();
};
