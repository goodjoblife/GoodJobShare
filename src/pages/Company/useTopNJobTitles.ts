import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { companyTopNJobTitlesBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { TopNJobTitles } from 'apis/queryCompanyTopNJobTitles';
import { RootState } from 'reducers';

const emptyTopNJobTitles: TopNJobTitles = {
  all: [],
  work: [],
  interview: [],
  salary: [],
};

export const useTopNJobTitles = (pageName: string): TopNJobTitles => {
  const selector = useCallback(
    (state: RootState) => {
      const data = companyTopNJobTitlesBoxSelectorByName(pageName)(state);
      if (!data || !data.data) {
        return emptyTopNJobTitles;
      }
      return data.data;
    },
    [pageName],
  );
  return useSelector(selector);
};
