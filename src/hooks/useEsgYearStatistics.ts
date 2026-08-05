import { useMemo } from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';
import {
  getAvailableYears,
  getLatestYear,
  getStatisticsByYear,
  StatisticsByYear,
} from 'utils/esgYearUtils';

export type EsgYearStatistics = StatisticsByYear & {
  availableYears: number[];
  selectedYear: number | undefined;
};

const EMPTY_STATISTICS: StatisticsByYear = {
  avgSalaryStatisticsItem: undefined,
  nonManagerAvgSalaryStatisticsItem: undefined,
  nonManagerMedianSalaryStatisticsItem: undefined,
  femaleManagerStatisticsItem: undefined,
};

const useEsgYearStatistics = (
  esgSalaryData: ESGSalaryData | null,
  year?: number,
): EsgYearStatistics => {
  const availableYears = useMemo(
    () => (esgSalaryData ? getAvailableYears(esgSalaryData) : []),
    [esgSalaryData],
  );

  const latestYear = useMemo(
    () => (esgSalaryData ? getLatestYear(esgSalaryData) : undefined),
    [esgSalaryData],
  );

  const selectedYear = year !== undefined ? year : latestYear;

  const statistics = useMemo(
    () =>
      esgSalaryData
        ? getStatisticsByYear(esgSalaryData, selectedYear)
        : EMPTY_STATISTICS,
    [esgSalaryData, selectedYear],
  );

  return useMemo(
    () => ({
      availableYears,
      selectedYear,
      ...statistics,
    }),
    [availableYears, selectedYear, statistics],
  );
};

export default useEsgYearStatistics;
