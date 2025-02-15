import { path } from 'ramda';
import { getUnfetched } from 'utils/fetchBox';

export const menuBoxSelector = path(['laborRights', 'menu']);

export const entryBoxSelectorById = entryId => state => {
  return state.laborRights.entryById[entryId] || getUnfetched();
};
