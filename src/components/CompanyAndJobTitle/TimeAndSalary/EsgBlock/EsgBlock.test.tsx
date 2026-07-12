import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ESGSalaryData } from 'apis/queryCompanyEsgSalaryData';

import EsgBlock from './EsgBlock';

const esgSalaryData: ESGSalaryData = {
  avgSalaryStatistics: [
    { year: 2023, average: 973000, sameIndustryAverage: 1000000 },
    { year: 2024, average: 1010000, sameIndustryAverage: 1020000 },
  ],
  nonManagerAvgSalaryStatistics: [
    { year: 2023, average: 994000, sameIndustryAverage: 900000 },
    { year: 2024, average: 1005000, sameIndustryAverage: 950000 },
  ],
  nonManagerMedianSalaryStatistics: [
    { year: 2023, median: 871000 },
    { year: 2024, median: 880000 },
  ],
  femaleManagerStatistics: [
    { year: 2023, percentage: 0.189 },
    { year: 2024, percentage: 0.2 },
  ],
};

beforeAll(() => {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
});

test('預設顯示最新年份 2024，四張卡片皆為該年', () => {
  render(<EsgBlock data={esgSalaryData} hasPreviewed />);
  expect(screen.getAllByText('2024 年')).toHaveLength(4);
  expect(screen.getByText('101.0')).toBeInTheDocument(); // 1010000 / 10000
});

test('切換到 2023 後卡片更新', () => {
  render(<EsgBlock data={esgSalaryData} hasPreviewed />);
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: '2023' },
  });
  expect(screen.getAllByText('2023 年')).toHaveLength(4);
  expect(screen.getByText('97.3')).toBeInTheDocument(); // 973000 / 10000
});

test('某指標缺選取年份資料 → 該卡片不渲染', () => {
  const partial = {
    avgSalaryStatistics: [
      { year: 2025, average: 1100000, sameIndustryAverage: 1100000 },
    ],
    nonManagerAvgSalaryStatistics: [],
    nonManagerMedianSalaryStatistics: [],
    femaleManagerStatistics: [],
  };
  render(<EsgBlock data={partial} hasPreviewed />);
  expect(screen.getAllByText('2025 年')).toHaveLength(1);
});

test('只有單一年份時不顯示年份下拉，但仍顯示卡片', () => {
  const singleYear = {
    avgSalaryStatistics: [
      { year: 2024, average: 1010000, sameIndustryAverage: 1020000 },
    ],
    nonManagerAvgSalaryStatistics: [
      { year: 2024, average: 1005000, sameIndustryAverage: 950000 },
    ],
    nonManagerMedianSalaryStatistics: [{ year: 2024, median: 880000 }],
    femaleManagerStatistics: [{ year: 2024, percentage: 0.2 }],
  };
  render(<EsgBlock data={singleYear} hasPreviewed />);
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  expect(screen.getAllByText('2024 年')).toHaveLength(4);
});

test('toggle 按鈕以 aria-expanded 反映收合狀態', () => {
  render(<EsgBlock data={esgSalaryData} hasPreviewed />);
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveAttribute('aria-expanded', 'false'); // hasPreviewed 初始為收合
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('收合狀態下切換年份會自動展開區塊', () => {
  render(<EsgBlock data={esgSalaryData} hasPreviewed />);
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: '2023' },
  });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('展開狀態下切換年份維持展開', () => {
  render(<EsgBlock data={esgSalaryData} />);
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: '2023' },
  });
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('空資料不會 crash，仍顯示標題', () => {
  const empty = {
    avgSalaryStatistics: [],
    nonManagerAvgSalaryStatistics: [],
    nonManagerMedianSalaryStatistics: [],
    femaleManagerStatistics: [],
  };
  render(<EsgBlock data={empty} hasPreviewed />);
  expect(screen.getByText('企業ESG公開薪資揭露')).toBeInTheDocument();
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
});
