import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

import {
  getAvailableYears,
  getStatisticsByYear,
  toEsgYearStatisticsList,
} from './esgYearUtils';

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

describe('getAvailableYears', () => {
  test('四陣列年份取聯集、由大到小排序、去重', () => {
    expect(getAvailableYears(sample)).toEqual([2024, 2023]);
  });

  test('全部陣列為空 → 空陣列', () => {
    expect(
      getAvailableYears({
        avgSalaryStatistics: [],
        nonManagerAvgSalaryStatistics: [],
        nonManagerMedianSalaryStatistics: [],
        femaleManagerStatistics: [],
      }),
    ).toEqual([]);
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
      nonManagerMedianSalaryStatisticsItem: null,
      femaleManagerStatisticsItem: null,
    });
  });

  test('該年缺資料的指標回 null', () => {
    const r = getStatisticsByYear(sample, 2023);
    expect(r.nonManagerAvgSalaryStatisticsItem).toBeNull();
    expect(r.avgSalaryStatisticsItem && r.avgSalaryStatisticsItem.year).toBe(
      2023,
    );
  });

  test('查無該年份 → 四個 item 皆為 null', () => {
    expect(getStatisticsByYear(sample, 2020)).toEqual({
      avgSalaryStatisticsItem: null,
      nonManagerAvgSalaryStatisticsItem: null,
      nonManagerMedianSalaryStatisticsItem: null,
      femaleManagerStatisticsItem: null,
    });
  });
});

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
