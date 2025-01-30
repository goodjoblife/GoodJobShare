import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { companyTopNJobTitlesBoxSelectorByName } from 'selectors/companyAndJobTitle';

export const useTopNJobTitles = pageName => {
  const selector = useCallback(
    state => {
      const data = companyTopNJobTitlesBoxSelectorByName(pageName)(state);
      if (!data || !data.data) {
        return {
          all: [],
          work: [],
          interview: [],
          work: [],
        };
      }
      return data.data;
    },
    [pageName],
  );
  return useSelector(selector);
};
