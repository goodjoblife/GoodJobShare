import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

type AvgSalaryStatisticsItem = ESGSalaryData['avgSalaryStatistics'][number];
type NonManagerMedianSalaryStatisticsItem = ESGSalaryData['nonManagerMedianSalaryStatistics'][number];
type FemaleManagerStatisticsItem = ESGSalaryData['femaleManagerStatistics'][number];

type StatisticsByYear = {
  avgSalaryStatisticsItem: AvgSalaryStatisticsItem | undefined;
  nonManagerAvgSalaryStatisticsItem: AvgSalaryStatisticsItem | undefined;
  nonManagerMedianSalaryStatisticsItem:
    | NonManagerMedianSalaryStatisticsItem
    | undefined;
  femaleManagerStatisticsItem: FemaleManagerStatisticsItem | undefined;
};

export const getAvailableYears = (esgSalaryData: ESGSalaryData): number[] => {
  const years = new Set<number>();
  Object.values(esgSalaryData).forEach(items => {
    items.forEach(item => years.add(item.year));
  });
  return Array.from(years).sort((a, b) => b - a);
};

export const getStatisticsByYear = (
  esgSalaryData: ESGSalaryData,
  year: number,
): StatisticsByYear => ({
  avgSalaryStatisticsItem: esgSalaryData.avgSalaryStatistics.find(
    item => item.year === year,
  ),
  nonManagerAvgSalaryStatisticsItem: esgSalaryData.nonManagerAvgSalaryStatistics.find(
    item => item.year === year,
  ),
  nonManagerMedianSalaryStatisticsItem: esgSalaryData.nonManagerMedianSalaryStatistics.find(
    item => item.year === year,
  ),
  femaleManagerStatisticsItem: esgSalaryData.femaleManagerStatistics.find(
    item => item.year === year,
  ),
});
