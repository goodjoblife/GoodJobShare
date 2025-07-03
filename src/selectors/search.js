import { getUnfetched } from 'utils/fetchBox';

export const searchByKeywordSelector = keyword => state => {
  return state.search.byKeyword[keyword] || getUnfetched();
};
