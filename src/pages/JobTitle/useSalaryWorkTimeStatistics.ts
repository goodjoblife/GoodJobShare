import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'reducers';
import {
  jobTitleSalaryWorkTimeStatisticsBoxSelectorByName,
  salaryWorkTimeStatistics as salaryWorkTimeStatisticsSelector,
} from 'selectors/companyAndJobTitle';

const useSalaryWorkTimeStatistics = (
  jobTitle: string,
): ReturnType<typeof salaryWorkTimeStatisticsSelector> => {
  const selector = useCallback(
    (state: RootState) => {
      const box = jobTitleSalaryWorkTimeStatisticsBoxSelectorByName(jobTitle)(
        state,
      );
      return salaryWorkTimeStatisticsSelector(box);
    },
    [jobTitle],
  );
  return useSelector(selector);
};

export default useSalaryWorkTimeStatistics;
