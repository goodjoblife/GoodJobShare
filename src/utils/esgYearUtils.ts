import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

type AvgSalaryStatisticsItem = ESGSalaryData['avgSalaryStatistics'][number];
type NonManagerMedianSalaryStatisticsItem = ESGSalaryData['nonManagerMedianSalaryStatistics'][number];
type FemaleManagerStatisticsItem = ESGSalaryData['femaleManagerStatistics'][number];

export type EsgYearStatistics = {
  year: number;
  avgSalaryStatisticsItem: AvgSalaryStatisticsItem | null;
  nonManagerAvgSalaryStatisticsItem: AvgSalaryStatisticsItem | null;
  nonManagerMedianSalaryStatisticsItem: NonManagerMedianSalaryStatisticsItem | null;
  femaleManagerStatisticsItem: FemaleManagerStatisticsItem | null;
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
): Omit<EsgYearStatistics, 'year'> => ({
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

// esgSalaryData 是 metric-major（四個陣列各自帶 year）；轉成 year-major，
// 依年份新到舊排序，讓 consumer 不必自己 find/group。
export const toEsgYearStatisticsList = (
  esgSalaryData: ESGSalaryData,
): EsgYearStatistics[] =>
  getAvailableYears(esgSalaryData).map(year => ({
    year,
    ...getStatisticsByYear(esgSalaryData, year),
  }));
