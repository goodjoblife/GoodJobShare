import { fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import qs from 'qs';
import React from 'react';
import { Router } from 'react-router-dom';

import SalaryFilter, {
  getDataTimeRange,
  getExperienceInYearRanges,
} from './SalaryFilter';

describe('getDataTimeRange', () => {
  test('不限時間時不送篩選條件', () => {
    expect(getDataTimeRange(undefined)).toBeUndefined();
  });

  test('將參考時間轉為日期區間', () => {
    const now = new Date(2025, 5, 15); // June 15, 2025
    expect(getDataTimeRange('past_year', now)).toEqual({
      start: { year: 2024, month: 6 },
      end: { year: 2025, month: 6 },
    });
  });

  test('跨年邊界：1 月往前一個月應得上一年 12 月', () => {
    const now = new Date(2025, 0, 10); // January 10, 2025
    expect(getDataTimeRange('past_month', now)).toEqual({
      start: { year: 2024, month: 12 },
      end: { year: 2025, month: 1 },
    });
  });
});

describe('getExperienceInYearRanges', () => {
  test('沒有選取項目時不送篩選條件', () => {
    expect(getExperienceInYearRanges([])).toBeUndefined();
  });

  test('將多個工作經歷轉為區間', () => {
    expect(getExperienceInYearRanges(['0_3', '8_plus'])).toEqual([
      { start: 0, end: 3 },
      { start: 8, end: 100 },
    ]);
  });
});

describe('SalaryFilter', () => {
  const renderFilter = (initialEntry = '/companies/example') => {
    const history = createMemoryHistory({ initialEntries: [initialEntry] });
    render(
      <Router history={history}>
        <SalaryFilter />
      </Router>,
    );
    return history;
  };

  test('同一列可選取多個項目，套用時一次寫入 URL 並清除頁碼', () => {
    const history = renderFilter(
      '/companies/example?p=3&sort_by=EARLIEST_FIRST',
    );
    fireEvent.click(screen.getByRole('button', { name: '篩選' }));

    fireEvent.click(screen.getByRole('button', { name: '過去一年' }));
    fireEvent.click(screen.getByRole('button', { name: '0 ~ 3 年' }));
    fireEvent.click(screen.getByRole('button', { name: '8 年以上' }));
    fireEvent.click(screen.getByRole('button', { name: '女性' }));
    fireEvent.click(screen.getByRole('button', { name: '套用' }));

    expect(
      qs.parse(history.location.search, { ignoreQueryPrefix: true }),
    ).toEqual({
      data_time: 'past_year',
      experience: ['0_3', '8_plus'],
      gender: 'female',
      sort_by: 'EARLIEST_FIRST',
    });
    expect(screen.queryByRole('dialog', { name: '薪資篩選' })).toBeNull();
  });

  test('沒有時間參數時，參考時間預設不亮高任何選項', () => {
    renderFilter();
    fireEvent.click(screen.getByRole('button', { name: '篩選' }));
    const row = screen.getByRole('group', { name: '參考時間' });

    ['過去一個月', '過去一年', '過去兩年', '不限時間'].forEach(label => {
      expect(
        within(row)
          .getByRole('button', { name: label })
          .getAttribute('aria-pressed'),
      ).toBe('false');
    });

    fireEvent.click(within(row).getByRole('button', { name: '過去一年' }));

    expect(
      within(row)
        .getByRole('button', { name: '過去一年' })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(
      within(row)
        .getByRole('button', { name: '不限時間' })
        .getAttribute('aria-pressed'),
    ).toBe('false');
  });

  test('使用者點選不限時間時才亮高', () => {
    renderFilter();
    fireEvent.click(screen.getByRole('button', { name: '篩選' }));
    const unlimitedButton = within(
      screen.getByRole('group', { name: '參考時間' }),
    ).getByRole('button', { name: '不限時間' });

    fireEvent.click(unlimitedButton);

    expect(unlimitedButton.getAttribute('aria-pressed')).toBe('true');
  });

  test('清除全部後參考時間不亮高任何選項', () => {
    renderFilter('/companies/example?data_time=past_year');
    fireEvent.click(screen.getByRole('button', { name: '篩選' }));
    fireEvent.click(screen.getByRole('button', { name: '清除全部' }));
    const row = screen.getByRole('group', { name: '參考時間' });

    ['過去一個月', '過去一年', '過去兩年', '不限時間'].forEach(label => {
      expect(
        within(row)
          .getByRole('button', { name: label })
          .getAttribute('aria-pressed'),
      ).toBe('false');
    });
  });

  test('點擊小螢幕遮罩會關閉篩選器', () => {
    renderFilter();
    fireEvent.click(screen.getByRole('button', { name: '篩選' }));

    fireEvent.click(screen.getByRole('button', { name: '關閉篩選' }));

    expect(screen.queryByRole('dialog', { name: '薪資篩選' })).toBeNull();
  });
});
