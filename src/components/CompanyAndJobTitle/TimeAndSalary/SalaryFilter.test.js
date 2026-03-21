import {
  salaryFilterFromQuerySelector,
  getDataTimeRange,
  getExperienceInYearRange,
} from './SalaryFilter';

// ─── salaryFilterFromQuerySelector ───────────────────────────────────────────

describe('salaryFilterFromQuerySelector', () => {
  test('空 query 時所有欄位為 null', () => {
    expect(salaryFilterFromQuerySelector({})).toEqual({
      dataTime: null,
      experience: null,
      gender: null,
      sortBy: null,
    });
  });

  test('完整 query 正確對應', () => {
    const query = {
      data_time: 'past_year',
      experience: '0_3',
      gender: 'female',
      sort_by: 'HIGH_HOUR_SALARY_FIRST',
    };
    expect(salaryFilterFromQuerySelector(query)).toEqual({
      dataTime: 'past_year',
      experience: '0_3',
      gender: 'female',
      sortBy: 'HIGH_HOUR_SALARY_FIRST',
    });
  });

  test('部分 query 缺漏的欄位為 null', () => {
    expect(salaryFilterFromQuerySelector({ gender: 'male' })).toEqual({
      dataTime: null,
      experience: null,
      gender: 'male',
      sortBy: null,
    });
  });
});

// ─── getDataTimeRange ─────────────────────────────────────────────────────────

describe('getDataTimeRange', () => {
  test('null → undefined', () => {
    expect(getDataTimeRange(null)).toBeUndefined();
  });

  test('undefined → undefined', () => {
    expect(getDataTimeRange(undefined)).toBeUndefined();
  });

  test('未知值 → undefined', () => {
    expect(getDataTimeRange('unknown')).toBeUndefined();
  });

  test('past_month → end 為當月、start 為一個月前', () => {
    const now = new Date();
    const end = { year: now.getFullYear(), month: now.getMonth() + 1 };
    const d = new Date(now);
    d.setMonth(d.getMonth() - 1);
    const start = { year: d.getFullYear(), month: d.getMonth() + 1 };

    expect(getDataTimeRange('past_month')).toEqual({ start, end });
  });

  test('past_year → end 為當月、start 為一年前', () => {
    const now = new Date();
    const end = { year: now.getFullYear(), month: now.getMonth() + 1 };
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 1);
    const start = { year: d.getFullYear(), month: d.getMonth() + 1 };

    expect(getDataTimeRange('past_year')).toEqual({ start, end });
  });

  test('past_two_years → end 為當月、start 為兩年前', () => {
    const now = new Date();
    const end = { year: now.getFullYear(), month: now.getMonth() + 1 };
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 2);
    const start = { year: d.getFullYear(), month: d.getMonth() + 1 };

    expect(getDataTimeRange('past_two_years')).toEqual({ start, end });
  });

  test('跨年邊界：1 月往前一個月應得上一年 12 月', () => {
    const OriginalDate = global.Date;
    global.Date = function(arg) {
      return arg === undefined
        ? new OriginalDate('2025-01-10T00:00:00.000Z')
        : new OriginalDate(arg);
    };

    try {
      expect(getDataTimeRange('past_month')).toEqual({
        start: { year: 2024, month: 12 },
        end: { year: 2025, month: 1 },
      });
    } finally {
      global.Date = OriginalDate;
    }
  });
});

// ─── getExperienceInYearRange ─────────────────────────────────────────────────

describe('getExperienceInYearRange', () => {
  test('null → undefined', () => {
    expect(getExperienceInYearRange(null)).toBeUndefined();
  });

  test('undefined → undefined', () => {
    expect(getExperienceInYearRange(undefined)).toBeUndefined();
  });

  test('未知值 → undefined', () => {
    expect(getExperienceInYearRange('unknown')).toBeUndefined();
  });

  test('0_3 → { start: 0, end: 3 }', () => {
    expect(getExperienceInYearRange('0_3')).toEqual({ start: 0, end: 3 });
  });

  test('4_7 → { start: 4, end: 7 }', () => {
    expect(getExperienceInYearRange('4_7')).toEqual({ start: 4, end: 7 });
  });

  test('8_plus → { start: 8, end: 100 }', () => {
    expect(getExperienceInYearRange('8_plus')).toEqual({ start: 8, end: 100 });
  });
});
