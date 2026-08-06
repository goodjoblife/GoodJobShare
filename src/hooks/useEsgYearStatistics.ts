import { useMemo } from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import {
  EMPTY_STATISTICS,
  getAvailableYears,
  getLatestYear,
  getStatisticsByYear,
  YearStatistics,
} from 'utils/esgYearUtils';

export type EsgYearStatistics = {
  availableYears: number[];
  selectedYear: number | null;
  statistics: YearStatistics;
};

const useEsgYearStatistics = (
  esgSalaryData: ESGSalaryData | null,
  year?: number,
): EsgYearStatistics =>
  useMemo(() => {
    const availableYears = getAvailableYears(esgSalaryData);
    const selectedYear =
      year !== undefined ? year : getLatestYear(availableYears);

    return {
      availableYears,
      selectedYear,
      statistics:
        esgSalaryData && selectedYear !== null
          ? getStatisticsByYear(esgSalaryData, selectedYear)
          : EMPTY_STATISTICS,
    };
  }, [esgSalaryData, year]);

export default useEsgYearStatistics;
