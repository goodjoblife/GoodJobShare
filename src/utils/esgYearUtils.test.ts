import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

import { toEsgYearStatisticsList } from './esgYearUtils';

const sample: ESGSalaryData = {
  avgSalaryStatistics: [
    { year: 2023, average: 973000, sameIndustryAverage: 1000000 },
    { year: 2024, average: 1010000, sameIndustryAverage: 1020000 },
  ],
  nonManagerAvgSalaryStatistics: [
    { year: 2024, average: 1005000, sameIndustryAverage: 950000 },
  ],
  nonManagerMedianSalaryStatistics: [{ year: 2023, median: 871000 }],
  femaleManagerStatistics: [{ year: 2023, percentage: 0.189 }],
};

describe('toEsgYearStatisticsList', () => {
  test('依年份新到舊排序、四陣列年份取聯集去重', () => {
    const result = toEsgYearStatisticsList(sample);
    expect(result.map(item => item.year)).toEqual([2024, 2023]);
  });

  test('每個年度只帶當年度有的指標，其餘為 null', () => {
    const result = toEsgYearStatisticsList(sample);

    expect(result[0]).toEqual({
      year: 2024,
      avgSalaryStatisticsItem: {
        year: 2024,
        average: 1010000,
        sameIndustryAverage: 1020000,
      },
      nonManagerAvgSalaryStatisticsItem: {
        year: 2024,
        average: 1005000,
        sameIndustryAverage: 950000,
      },
      nonManagerMedianSalaryStatisticsItem: null,
      femaleManagerStatisticsItem: null,
    });

    expect(result[1]).toEqual({
      year: 2023,
      avgSalaryStatisticsItem: {
        year: 2023,
        average: 973000,
        sameIndustryAverage: 1000000,
      },
      nonManagerAvgSalaryStatisticsItem: null,
      nonManagerMedianSalaryStatisticsItem: { year: 2023, median: 871000 },
      femaleManagerStatisticsItem: { year: 2023, percentage: 0.189 },
    });
  });

  test('全部陣列為空 → 空陣列', () => {
    expect(
      toEsgYearStatisticsList({
        avgSalaryStatistics: [],
        nonManagerAvgSalaryStatistics: [],
        nonManagerMedianSalaryStatistics: [],
        femaleManagerStatistics: [],
      }),
    ).toEqual([]);
  });
});
