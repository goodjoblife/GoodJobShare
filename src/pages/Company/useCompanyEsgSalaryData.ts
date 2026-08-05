import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import { RootState } from 'reducers';
import { companyEsgSalaryDataBoxSelectorByName } from 'selectors/companyAndJobTitle';
import { isFetched } from 'utils/fetchBox';

export const useCompanyEsgSalaryData = (
  companyName: string,
): ESGSalaryData | null => {
  const selector = useMemo(
    () => (state: RootState) => {
      const box = companyEsgSalaryDataBoxSelectorByName(companyName)(state);
      return isFetched(box) ? box.data : null;
    },
    [companyName],
  );

  return useSelector(selector);
};
