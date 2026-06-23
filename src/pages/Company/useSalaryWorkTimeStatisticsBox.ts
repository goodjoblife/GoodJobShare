import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import {
  companySalaryWorkTimeStatisticsBoxSelectorByName,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
} from 'selectors/companyAndJobTitle';

const useSalaryWorkTimeStatisticsBox = (
  companyName: string,
): ReturnType<typeof salaryWorkTimeStatisticsSelector> => {
  const selector = useCallback(
    (state: RootState) => {
      const company = companySalaryWorkTimeStatisticsBoxSelectorByName(
        companyName,
      )(state);
      return salaryWorkTimeStatisticsSelector(company);
    },
    [companyName],
  );
  return useSelector(selector);
};

export default useSalaryWorkTimeStatisticsBox;
