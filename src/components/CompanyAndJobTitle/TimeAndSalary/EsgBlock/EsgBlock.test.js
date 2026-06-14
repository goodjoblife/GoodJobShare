import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import EsgBlock from './EsgBlock';

const esgSalaryData = {
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

test('預設顯示最新年份 2024，四張卡片皆為該年', () => {
  render(<EsgBlock esgSalaryData={esgSalaryData} hasPreviewed />);
  expect(screen.getAllByText('2024 年')).toHaveLength(4);
  expect(screen.getByText('101.0')).toBeInTheDocument(); // 1010000 / 10000
});

test('切換到 2023 後卡片更新', () => {
  render(<EsgBlock esgSalaryData={esgSalaryData} hasPreviewed />);
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
  render(<EsgBlock esgSalaryData={partial} hasPreviewed />);
  expect(screen.getAllByText('2025 年')).toHaveLength(1);
});

test('空資料不會 crash，仍顯示標題', () => {
  const empty = {
    avgSalaryStatistics: [],
    nonManagerAvgSalaryStatistics: [],
    nonManagerMedianSalaryStatistics: [],
    femaleManagerStatistics: [],
  };
  render(<EsgBlock esgSalaryData={empty} hasPreviewed />);
  expect(screen.getByText('企業ESG公開薪資揭露')).toBeInTheDocument();
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
});
