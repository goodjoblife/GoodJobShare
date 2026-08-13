import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { EsgYearStatistics } from 'utils/esgYearUtils';

import EsgBlock from './EsgBlock';

const esgYearStatisticsList: EsgYearStatistics[] = [
  {
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
    nonManagerMedianSalaryStatisticsItem: { year: 2024, median: 880000 },
    femaleManagerStatisticsItem: { year: 2024, percentage: 0.2 },
  },
  {
    year: 2023,
    avgSalaryStatisticsItem: {
      year: 2023,
      average: 973000,
      sameIndustryAverage: 1000000,
    },
    nonManagerAvgSalaryStatisticsItem: {
      year: 2023,
      average: 994000,
      sameIndustryAverage: 900000,
    },
    nonManagerMedianSalaryStatisticsItem: { year: 2023, median: 871000 },
    femaleManagerStatisticsItem: { year: 2023, percentage: 0.189 },
  },
];

test('固定顯示陣列中第一筆（最新）年份，四張卡片皆為該年', () => {
  render(<EsgBlock data={esgYearStatisticsList} hasPreviewed />);
  expect(screen.getAllByText('2024 年')).toHaveLength(4);
  expect(screen.queryByText('2023 年')).not.toBeInTheDocument();
  expect(screen.getByText('101.0')).toBeInTheDocument(); // 1010000 / 10000
});

test('某指標為 null → 該卡片不渲染', () => {
  const partial: EsgYearStatistics[] = [
    {
      year: 2025,
      avgSalaryStatisticsItem: {
        year: 2025,
        average: 1100000,
        sameIndustryAverage: 1100000,
      },
      nonManagerAvgSalaryStatisticsItem: null,
      nonManagerMedianSalaryStatisticsItem: null,
      femaleManagerStatisticsItem: null,
    },
  ];
  render(<EsgBlock data={partial} hasPreviewed />);
  expect(screen.getAllByText('2025 年')).toHaveLength(1);
});

test('toggle 按鈕以 aria-expanded 反映收合狀態', () => {
  render(<EsgBlock data={esgYearStatisticsList} hasPreviewed />);
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveAttribute('aria-expanded', 'false'); // hasPreviewed 初始為收合
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('未預覽過時預設為展開', () => {
  render(<EsgBlock data={esgYearStatisticsList} />);
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
});

test('四個指標皆為 null 不會 crash，仍顯示標題', () => {
  const empty: EsgYearStatistics[] = [
    {
      year: 2024,
      avgSalaryStatisticsItem: null,
      nonManagerAvgSalaryStatisticsItem: null,
      nonManagerMedianSalaryStatisticsItem: null,
      femaleManagerStatisticsItem: null,
    },
  ];
  render(<EsgBlock data={empty} hasPreviewed />);
  expect(screen.getByText('企業ESG公開薪資揭露')).toBeInTheDocument();
});
