import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { companyTopNJobTitlesBoxSelectorByName } from 'selectors/companyAndJobTitle';

export const useTopNJobTitles = pageName => {
  const selector = useCallback(
    state => {
      const data = companyTopNJobTitlesBoxSelectorByName(pageName)(state);
      return data.data;
    },
    [pageName],
  );
  return useSelector(selector);
};
