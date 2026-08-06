import { renderHook } from '@testing-library/react-hooks';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

import useEsgYearStatistics from './useEsgYearStatistics';

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

describe('useEsgYearStatistics', () => {
  test('未指定 year → 跟著最新年度', () => {
    const { result } = renderHook(() => useEsgYearStatistics(sample));

    expect(result.current.availableYears).toEqual([2024, 2023]);
    expect(result.current.selectedYear).toBe(2024);
    expect(result.current.statistics.avgSalaryStatisticsItem).toEqual({
      year: 2024,
      average: 1010000,
      sameIndustryAverage: 1020000,
    });
    expect(result.current.statistics.femaleManagerStatisticsItem).toBeNull();
  });

  test('指定 year → 取該年度的指標', () => {
    const { result } = renderHook(() => useEsgYearStatistics(sample, 2023));

    expect(result.current.selectedYear).toBe(2023);
    expect(result.current.statistics.femaleManagerStatisticsItem).toEqual({
      year: 2023,
      percentage: 0.189,
    });
    expect(
      result.current.statistics.nonManagerAvgSalaryStatisticsItem,
    ).toBeNull();
  });

  test('esgSalaryData 為 null → 年度清單為空、四個 item 都是 null', () => {
    const { result } = renderHook(() => useEsgYearStatistics(null));

    expect(result.current.availableYears).toEqual([]);
    expect(result.current.selectedYear).toBeNull();
    expect(result.current.statistics.avgSalaryStatisticsItem).toBeNull();
    expect(
      result.current.statistics.nonManagerAvgSalaryStatisticsItem,
    ).toBeNull();
    expect(
      result.current.statistics.nonManagerMedianSalaryStatisticsItem,
    ).toBeNull();
    expect(result.current.statistics.femaleManagerStatisticsItem).toBeNull();
  });

  test('資料為空 → selectedYear 為 null', () => {
    const { result } = renderHook(() => useEsgYearStatistics(empty));

    expect(result.current.availableYears).toEqual([]);
    expect(result.current.selectedYear).toBeNull();
    expect(result.current.statistics.avgSalaryStatisticsItem).toBeNull();
  });

  test('year 由 undefined 改為指定年度 → selectedYear 跟著切換', () => {
    const { result, rerender } = renderHook(
      ({ year }: { year?: number }) => useEsgYearStatistics(sample, year),
      { initialProps: { year: undefined } as { year?: number } },
    );

    expect(result.current.selectedYear).toBe(2024);

    rerender({ year: 2023 });

    expect(result.current.selectedYear).toBe(2023);
    expect(result.current.statistics.femaleManagerStatisticsItem).toEqual({
      year: 2023,
      percentage: 0.189,
    });
  });

  test('輸入不變時回傳同一個物件，避免呼叫端誤判為變更', () => {
    const { result, rerender } = renderHook(() =>
      useEsgYearStatistics(sample, 2024),
    );
    const first = result.current;

    rerender();

    expect(result.current).toBe(first);
  });
});
