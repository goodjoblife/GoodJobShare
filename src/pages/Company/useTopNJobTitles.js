import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  companyTopNJobTitlesBoxSelectorByName,
  topNJobTitles,
} from 'selectors/companyAndJobTitle';

export const useTopNJobTitles = pageName => {
  const selector = useCallback(
    state => {
      const company = companyTopNJobTitlesBoxSelectorByName(pageName)(state);
      return topNJobTitles(company);
    },
    [pageName],
  );
  return useSelector(selector);
};
