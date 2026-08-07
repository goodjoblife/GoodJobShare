import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

import {
  EMPTY_STATISTICS,
  getAvailableYears,
  getEsgYearStatistics,
  getLatestYear,
  getStatisticsByYear,
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

const empty: ESGSalaryData = {
  avgSalaryStatistics: [],
  nonManagerAvgSalaryStatistics: [],
  nonManagerMedianSalaryStatistics: [],
  femaleManagerStatistics: [],
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

  test('null → 空陣列', () => {
    expect(getAvailableYears(null)).toEqual([]);
  });
});

describe('getLatestYear', () => {
  test('取出最新的年份', () => {
    expect(getLatestYear([2024, 2023])).toBe(2024);
  });

  test('不依賴輸入順序', () => {
    expect(getLatestYear([2022, 2024, 2023])).toBe(2024);
  });

  test('空陣列 → null', () => {
    expect(getLatestYear([])).toBeNull();
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

  test('查無該年份 → EMPTY_STATISTICS', () => {
    expect(getStatisticsByYear(sample, 2020)).toEqual(EMPTY_STATISTICS);
  });

  test('esgSalaryData 為 null → EMPTY_STATISTICS', () => {
    expect(getStatisticsByYear(null, 2024)).toEqual(EMPTY_STATISTICS);
  });

  test('year 為 null → EMPTY_STATISTICS', () => {
    expect(getStatisticsByYear(sample, null)).toEqual(EMPTY_STATISTICS);
  });
});

describe('getEsgYearStatistics', () => {
  test('未指定 year → 跟著最新年度', () => {
    const result = getEsgYearStatistics(sample);

    expect(result.availableYears).toEqual([2024, 2023]);
    expect(result.selectedYear).toBe(2024);
    expect(result.yearStatistics.avgSalaryStatisticsItem).toEqual({
      year: 2024,
      average: 1010000,
      sameIndustryAverage: 1020000,
    });
    expect(result.yearStatistics.femaleManagerStatisticsItem).toBeNull();
  });

  test('指定 year → 取該年度的指標', () => {
    const result = getEsgYearStatistics(sample, 2023);

    expect(result.selectedYear).toBe(2023);
    expect(result.yearStatistics.femaleManagerStatisticsItem).toEqual({
      year: 2023,
      percentage: 0.189,
    });
    expect(result.yearStatistics.nonManagerAvgSalaryStatisticsItem).toBeNull();
  });

  test('esgSalaryData 為 null → 年度清單為空、四個 item 都是 null', () => {
    const result = getEsgYearStatistics(null);

    expect(result.availableYears).toEqual([]);
    expect(result.selectedYear).toBeNull();
    expect(result.yearStatistics).toEqual(EMPTY_STATISTICS);
  });

  test('資料為空 → selectedYear 為 null', () => {
    const result = getEsgYearStatistics(empty);

    expect(result.availableYears).toEqual([]);
    expect(result.selectedYear).toBeNull();
    expect(result.yearStatistics).toEqual(EMPTY_STATISTICS);
  });
});
