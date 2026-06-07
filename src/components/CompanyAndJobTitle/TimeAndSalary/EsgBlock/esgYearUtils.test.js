import { getAvailableYears, getStatisticsByYear } from './esgYearUtils';

const sample = {
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

describe('getAvailableYears', () => {
  test('四陣列年份取聯集、由大到小排序、去重', () => {
    expect(getAvailableYears(sample)).toEqual([2024, 2023]);
  });

  test('空資料 → 空陣列', () => {
    expect(
      getAvailableYears({
        avgSalaryStatistics: [],
        nonManagerAvgSalaryStatistics: [],
        nonManagerMedianSalaryStatistics: [],
        femaleManagerStatistics: [],
      }),
    ).toEqual([]);
  });

  test('欄位為 undefined 也不爆', () => {
    expect(getAvailableYears({})).toEqual([]);
  });
});

describe('getStatisticsByYear', () => {
  test('取出指定年份的四個 item', () => {
    expect(getStatisticsByYear(sample, 2024)).toEqual({
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
      nonManagerMedianSalaryStatisticsItem: undefined,
      femaleManagerStatisticsItem: undefined,
    });
  });

  test('該年缺資料的指標回 undefined', () => {
    const r = getStatisticsByYear(sample, 2023);
    expect(r.nonManagerAvgSalaryStatisticsItem).toBeUndefined();
    expect(r.avgSalaryStatisticsItem.year).toBe(2023);
  });
});
