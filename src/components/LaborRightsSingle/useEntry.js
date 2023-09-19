import R from 'ramda';
import { useSelector } from 'react-redux';
import {
  entryDataSelector,
  entryStatusSelector,
  entryErrorSelector,
  menuBoxSelector,
} from 'selectors/laborRightsSelector';

export const useNeighborEntry = entryId => {
  const menuBox = useSelector(menuBoxSelector);
  const menuEntries = menuBox.data || [];

  const index = R.findIndex(R.propEq('id', entryId))(menuEntries);
  const prevEntry = index > 0 ? menuEntries[index - 1] : undefined;
  const nextEntry =
    index < menuEntries.length - 1 ? menuEntries[index + 1] : undefined;

  return [prevEntry, nextEntry];
};

const useEntry = entryId => {
  const entryStatus = useSelector(entryStatusSelector(entryId));
  const entryError = useSelector(entryErrorSelector(entryId));
  const entry = useSelector(entryDataSelector(entryId));

  return [entryStatus, entryError, entry];
};

export default useEntry;
