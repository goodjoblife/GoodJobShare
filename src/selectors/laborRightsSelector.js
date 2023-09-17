import R, { path } from 'ramda';

import fetchingStatus from '../constants/status';

export const menuBoxSelector = path(['laborRights', 'menuBox']);

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
