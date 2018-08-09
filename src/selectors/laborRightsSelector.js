import fetchingStatus from '../constants/status';

export const menuEntriesSelector = state =>
  state.laborRights.get('menuEntries');

export const menuStatusSelector = state => state.laborRights.get('menuStatus');

export const entryDataSelector = entryId => state =>
  state.laborRights.getIn(['entries', entryId, 'data']);

export const entryStatusSelector = entryId => state =>
  state.laborRights.getIn(
    ['entries', entryId, 'status'],
    fetchingStatus.UNFETCHED
  );
