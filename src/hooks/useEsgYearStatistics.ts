import { useMemo } from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import {
  EMPTY_STATISTICS,
  getAvailableYears,
  getLatestYear,
  getStatisticsByYear,
  StatisticsByYear,
} from 'utils/esgYearUtils';

export type EsgYearStatistics = StatisticsByYear & {
  availableYears: number[];
  selectedYear: number | null;
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
      ...(esgSalaryData && selectedYear !== null
        ? getStatisticsByYear(esgSalaryData, selectedYear)
        : EMPTY_STATISTICS),
    };
  }, [esgSalaryData, year]);

export default useEsgYearStatistics;
