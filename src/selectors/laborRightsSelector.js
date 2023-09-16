import R, { path } from 'ramda';
import { fromJS } from 'immutable';
import fetchingStatus from '../constants/status';

export const menuEntriesSelector = R.path(['laborRights', 'menuEntries']);

export const menuStatusSelector = R.pipe(
  R.path(['laborRights', 'menuStatus']),
  fromJS,
);

export const menuErrorSelector = R.pipe(
  R.path(['laborRights', 'menuError']),
  fromJS,
);

export const menuStateSelector = path(['laborRights', 'menuState']);

export const entryDataSelector = entryId =>
  R.path(['laborRights', 'entries', entryId, 'data']);

export const entryStatusSelector = entryId =>
  R.pathOr(fetchingStatus.UNFETCHED, [
    'laborRights',
    'entries',
    entryId,
    'status',
  ]);

export const entryErrorSelector = entryId =>
  R.path(['laborRights', 'entries', entryId, 'error']);
