import R from 'ramda';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { LaborRightEntry } from 'apis/queryLaborRights';
import { LaborRightMenuEntry } from 'apis/queryLaborRightsMenu';
import {
  entryBoxSelectorById,
  menuBoxSelector,
} from 'selectors/laborRightsSelector';
import FetchBox from 'utils/fetchBox';

export const useNeighborEntry = (
  entryId: string,
): {
  prevEntry: LaborRightMenuEntry | null;
  nextEntry: LaborRightMenuEntry | null;
} => {
  const menuBox = useSelector(menuBoxSelector);
  const menuEntries = menuBox.data || [];

  const index = R.findIndex(menuEntry => menuEntry.id === entryId, menuEntries);
  const prevEntry = index > 0 ? menuEntries[index - 1] : null;
  const nextEntry =
    index < menuEntries.length - 1 ? menuEntries[index + 1] : null;

  return { prevEntry, nextEntry };
};

const useEntry = (entryId: string): FetchBox<LaborRightEntry | null> => {
  const selector = useMemo(() => entryBoxSelectorById(entryId), [entryId]);
  return useSelector(selector);
};

export default useEntry;
