import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

type AvgSalaryStatisticsItem = ESGSalaryData['avgSalaryStatistics'][number];
type NonManagerMedianSalaryStatisticsItem = ESGSalaryData['nonManagerMedianSalaryStatistics'][number];
type FemaleManagerStatisticsItem = ESGSalaryData['femaleManagerStatistics'][number];

export type YearStatistics = {
  avgSalaryStatisticsItem: AvgSalaryStatisticsItem | null;
  nonManagerAvgSalaryStatisticsItem: AvgSalaryStatisticsItem | null;
  nonManagerMedianSalaryStatisticsItem: NonManagerMedianSalaryStatisticsItem | null;
  femaleManagerStatisticsItem: FemaleManagerStatisticsItem | null;
};

export const EMPTY_STATISTICS: YearStatistics = {
  avgSalaryStatisticsItem: null,
  nonManagerAvgSalaryStatisticsItem: null,
  nonManagerMedianSalaryStatisticsItem: null,
  femaleManagerStatisticsItem: null,
};

export const getAvailableYears = (
  esgSalaryData: ESGSalaryData | null,
): number[] => {
  if (!esgSalaryData) return [];
  const years = new Set<number>();
  Object.values(esgSalaryData).forEach(items => {
    items.forEach(item => years.add(item.year));
  });
  return Array.from(years).sort((a, b) => b - a);
};

export const getLatestYear = (years: number[]): number | null =>
  years.length > 0 ? Math.max(...years) : null;

export const getStatisticsByYear = (
  esgSalaryData: ESGSalaryData,
  year: number,
): YearStatistics => ({
  avgSalaryStatisticsItem:
    esgSalaryData.avgSalaryStatistics.find(item => item.year === year) || null,
  nonManagerAvgSalaryStatisticsItem:
    esgSalaryData.nonManagerAvgSalaryStatistics.find(
      item => item.year === year,
    ) || null,
  nonManagerMedianSalaryStatisticsItem:
    esgSalaryData.nonManagerMedianSalaryStatistics.find(
      item => item.year === year,
    ) || null,
  femaleManagerStatisticsItem:
    esgSalaryData.femaleManagerStatistics.find(item => item.year === year) ||
    null,
});
