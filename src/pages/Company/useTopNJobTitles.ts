import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { TopNJobTitles } from 'apis/queryCompanyTopNJobTitles';
import { RootState } from 'reducers';
import { companyTopNJobTitlesBoxSelectorByName } from 'selectors/companyAndJobTitle';

const emptyTopNJobTitles: TopNJobTitles = {
  all: [],
  work: [],
  interview: [],
  salary: [],
};

export const useTopNJobTitles = (pageName: string): TopNJobTitles => {
  const selector = useCallback(
    (state: RootState) => {
      const box = companyTopNJobTitlesBoxSelectorByName(pageName)(state);
      if (!box.data) {
        return emptyTopNJobTitles;
      }
      return box.data;
    },
    [pageName],
  );
  return useSelector(selector);
};
