import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

type TAvgSalaryStatisticsItem = ESGSalaryData['avgSalaryStatistics'][number];
type TNonManagerMedianSalaryStatisticsItem = ESGSalaryData['nonManagerMedianSalaryStatistics'][number];
type TFemaleManagerStatisticsItem = ESGSalaryData['femaleManagerStatistics'][number];

type TStatisticsByYear = {
  avgSalaryStatisticsItem: TAvgSalaryStatisticsItem | undefined;
  nonManagerAvgSalaryStatisticsItem: TAvgSalaryStatisticsItem | undefined;
  nonManagerMedianSalaryStatisticsItem:
    | TNonManagerMedianSalaryStatisticsItem
    | undefined;
  femaleManagerStatisticsItem: TFemaleManagerStatisticsItem | undefined;
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
): TStatisticsByYear => ({
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
