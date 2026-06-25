import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

type TEsgSalaryDataLike = Partial<ESGSalaryData> | null | undefined;

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

export const getAvailableYears = (
  esgSalaryData: TEsgSalaryDataLike,
): number[] => {
  if (!esgSalaryData) return [];
  const years = new Set<number>();
  Object.values(esgSalaryData).forEach(items => {
    (items || []).forEach(item => years.add(item.year));
  });
  return Array.from(years).sort((a, b) => b - a);
};

export const getStatisticsByYear = (
  esgSalaryData: TEsgSalaryDataLike,
  year: number,
): TStatisticsByYear => {
  const data: Partial<ESGSalaryData> = esgSalaryData || {};
  return {
    avgSalaryStatisticsItem: (data.avgSalaryStatistics || []).find(
      item => item.year === year,
    ),
    nonManagerAvgSalaryStatisticsItem: (
      data.nonManagerAvgSalaryStatistics || []
    ).find(item => item.year === year),
    nonManagerMedianSalaryStatisticsItem: (
      data.nonManagerMedianSalaryStatistics || []
    ).find(item => item.year === year),
    femaleManagerStatisticsItem: (data.femaleManagerStatistics || []).find(
      item => item.year === year,
    ),
  };
};
