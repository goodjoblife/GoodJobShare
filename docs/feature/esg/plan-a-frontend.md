# 計畫 A — ESG 年份下拉選單（前端）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在公司薪資頁 ESG 區塊右上角加年份下拉選單，預設最新年，切換即更新四張統計卡片。

**Architecture:** 把年份篩選抽成純函式（`esgYearUtils.js`）以利 TDD；`EsgBlock.js` 改收整包 `esgSalaryData`、用 `useState` 管理選取年份、重用 `common/form/Select`；`TimeAndSalary/index.js` 停止取 `[0]` 改傳整包。GraphQL / Redux / SSR 不動。

**Tech Stack:** React (function components + hooks), CSS Modules, jest + @testing-library/react。

**Repo / 工作目錄:** `/Users/yong/Documents/workspace/GoodJobShare`

---

## File Structure

| 檔案 | 動作 | 職責 |
|------|------|------|
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.js` | Create | 純函式：`getAvailableYears`、`getStatisticsByYear` |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.test.js` | Create | 純函式單元測試 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.js` | Modify | 改收 `esgSalaryData`、加年份 state + Select + 篩選 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.test.js` | Create | 元件渲染/互動測試 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.module.css` | Modify | 新增 `.header`、`.yearSelect` |
| `src/components/CompanyAndJobTitle/TimeAndSalary/index.js` | Modify | 停止取 `[0]`，改傳 `esgSalaryData={data}` |

---

## Task 1：純函式 `esgYearUtils`

**Files:**
- Create: `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.js`
- Test: `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.test.js`

- [ ] **Step 1: 寫失敗測試**

`esgYearUtils.test.js`：

```js
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
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.test.js`
Expected: FAIL（`Cannot find module './esgYearUtils'`）

- [ ] **Step 3: 寫最小實作**

`esgYearUtils.js`：

```js
const STAT_KEYS = [
  'avgSalaryStatistics',
  'nonManagerAvgSalaryStatistics',
  'nonManagerMedianSalaryStatistics',
  'femaleManagerStatistics',
];

export const getAvailableYears = esgSalaryData => {
  const years = new Set();
  STAT_KEYS.forEach(key => {
    (esgSalaryData[key] || []).forEach(item => years.add(item.year));
  });
  return [...years].sort((a, b) => b - a);
};

export const getStatisticsByYear = (esgSalaryData, year) => ({
  avgSalaryStatisticsItem: (esgSalaryData.avgSalaryStatistics || []).find(
    item => item.year === year,
  ),
  nonManagerAvgSalaryStatisticsItem: (
    esgSalaryData.nonManagerAvgSalaryStatistics || []
  ).find(item => item.year === year),
  nonManagerMedianSalaryStatisticsItem: (
    esgSalaryData.nonManagerMedianSalaryStatistics || []
  ).find(item => item.year === year),
  femaleManagerStatisticsItem: (
    esgSalaryData.femaleManagerStatistics || []
  ).find(item => item.year === year),
});
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.js src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/esgYearUtils.test.js
git commit -m "feat(esg): add esgYearUtils for year filtering"
```

---

## Task 2：`EsgBlock.js` 加年份 state + 下拉選單

**Files:**
- Modify: `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.js`
- Test: `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.test.js`

- [ ] **Step 1: 寫失敗測試**

`EsgBlock.test.js`：

```js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  // 預設最新年 2025，只有 avgSalaryStatistics 有資料 → 只 1 張卡
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
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.test.js`
Expected: FAIL（目前 `EsgBlock` 還是收四個單筆 props、無 `combobox`）

- [ ] **Step 3: 改寫 `EsgBlock.js`**

把檔案中 `EsgBlock`（main component，非 `EsgItemBlock`）整段改寫，並在頂部 import 區加入 `useMemo`、`Select`、`esgYearUtils`。

import 區（檔案最上方）改為：

```js
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import linkStyles from 'common/base/Link.module.css';
import Caret from 'common/icons/Caret';
import Card from 'common/Card';
import Info from 'common/icons/Info';
import Select from 'common/form/Select';
import styles from './EsgBlock.module.css';
import overviewStyles from '../../Overview/Overview.module.css';
import { formatNumberWithSign } from 'utils/stringUtil';
import { getAvailableYears, getStatisticsByYear } from './esgYearUtils';
```

`EsgItemBlock` 與其 `propTypes` **維持不變**。把 `const EsgBlock = (...) => {...}` 整個元件改為：

```js
const EsgBlock = ({
  className,
  showsToggle = true,
  hasPreviewed,
  esgSalaryData,
}) => {
  const [isCollapsed, setCollapsed] = useState(hasPreviewed);

  const availableYears = useMemo(
    () => getAvailableYears(esgSalaryData),
    [esgSalaryData],
  );
  const [selectedYear, setSelectedYear] = useState(() => availableYears[0]);

  const {
    avgSalaryStatisticsItem,
    nonManagerAvgSalaryStatisticsItem,
    nonManagerMedianSalaryStatisticsItem,
    femaleManagerStatisticsItem,
  } = useMemo(() => getStatisticsByYear(esgSalaryData, selectedYear), [
    esgSalaryData,
    selectedYear,
  ]);

  const yearOptions = useMemo(
    () => availableYears.map(year => ({ label: `${year}`, value: year })),
    [availableYears],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed(isCollapsed => !isCollapsed);
  }, []);

  const handleYearChange = useCallback(e => {
    setSelectedYear(Number(e.target.value));
  }, []);

  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div className={overviewStyles.title}>
          企業ESG公開薪資揭露
          {showsToggle && (
            <button
              className={cn(styles.toggle, { [styles.collapsed]: isCollapsed })}
              onClick={toggleCollapsed}
            >
              <Caret />
            </button>
          )}
        </div>
        {availableYears.length > 0 && (
          <div className={styles.yearSelect}>
            <Select
              hasNullOption={false}
              value={selectedYear}
              options={yearOptions}
              onChange={handleYearChange}
            />
          </div>
        )}
      </div>
      <div
        className={cn(styles.content, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        <div className={styles.items}>
          {avgSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="員工薪資平均數"
              year={avgSalaryStatisticsItem.year}
              value={avgSalaryStatisticsItem.average / 10000}
              valueCompared={
                avgSalaryStatisticsItem.sameIndustryAverage / 10000
              }
              unit="萬 / 年"
            />
          )}
          {nonManagerAvgSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資平均數"
              year={nonManagerAvgSalaryStatisticsItem.year}
              value={nonManagerAvgSalaryStatisticsItem.average / 10000}
              valueCompared={
                nonManagerAvgSalaryStatisticsItem.sameIndustryAverage / 10000
              }
              unit="萬 / 年"
            />
          )}
          {nonManagerMedianSalaryStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="非主管全時員工薪資中位數"
              year={nonManagerMedianSalaryStatisticsItem.year}
              value={nonManagerMedianSalaryStatisticsItem.median / 10000}
              unit="萬 / 年"
            />
          )}
          {femaleManagerStatisticsItem && (
            <EsgItemBlock
              className={styles.item}
              title="管理職女性主管佔比"
              year={femaleManagerStatisticsItem.year}
              value={femaleManagerStatisticsItem.percentage * 100}
              unit="%"
            />
          )}
        </div>
        <div className={styles.disclaimer}>
          資料來源：
          <a
            className={linkStyles.link}
            href="https://mops.twse.com.tw/mops/web/t214sb01"
            target="_blank"
            rel="noopener noreferrer"
          >
            臺灣證券交易所 公開資訊觀測站
          </a>
        </div>
      </div>
    </Card>
  );
};
```

把檔案底部的 `EsgBlock.propTypes` 改為：

```js
const statisticsArrayPropType = PropTypes.arrayOf(
  PropTypes.shape({ year: PropTypes.number }),
);

EsgBlock.propTypes = {
  className: PropTypes.string,
  esgSalaryData: PropTypes.shape({
    avgSalaryStatistics: statisticsArrayPropType,
    nonManagerAvgSalaryStatistics: statisticsArrayPropType,
    nonManagerMedianSalaryStatistics: statisticsArrayPropType,
    femaleManagerStatistics: statisticsArrayPropType,
  }),
  hasPreviewed: PropTypes.bool,
  showsToggle: PropTypes.bool,
};
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.test.js`
Expected: PASS（4 個 test 全過）

- [ ] **Step 5: Commit**

```bash
git add src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.js src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.test.js
git commit -m "feat(esg): add year dropdown and filtering to EsgBlock"
```

---

## Task 3：下拉選單版面 CSS

**Files:**
- Modify: `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.module.css`

- [ ] **Step 1: 新增樣式**

在 `EsgBlock.module.css` 末尾新增（`.header` 讓標題靠左、選單靠右；`.yearSelect` 控制選單寬度，內層 `Select` 已是 `width:100%`）：

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.yearSelect {
  width: 110px;
  flex: none;
  margin-left: 16px;
}
```

- [ ] **Step 2: 跑既有測試確認沒壞**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/`
Expected: PASS（CSS Module 在 jest 下為 identity-proxy，不影響測試）

- [ ] **Step 3: Commit**

```bash
git add src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.module.css
git commit -m "style(esg): layout for year select in EsgBlock header"
```

---

## Task 4：`TimeAndSalary/index.js` 改傳整包 `esgSalaryData`

**Files:**
- Modify: `src/components/CompanyAndJobTitle/TimeAndSalary/index.js`（ESG 區塊 `BoxRenderer` 的 `render`，約 42–73 行）

- [ ] **Step 1: 改 render 內容**

把目前解構四陣列 `[0]` 並傳四個單筆 props 的寫法，改為直接傳整包。將該 `BoxRenderer` 的 `render` 改為：

```jsx
render={data => {
  if (!data) return null;
  return (
    <Wrapper size="l">
      <EsgBlock esgSalaryData={data} />
    </Wrapper>
  );
}}
```

（移除原本 `const { avgSalaryStatistics: [avgSalaryStatisticsItem], ... } = data;` 整段解構，以及四個 `xxxItem={...}` props。）

- [ ] **Step 2: 跑相關測試 + lint**

Run: `npx jest src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/`
Run: `npx eslint src/components/CompanyAndJobTitle/TimeAndSalary/index.js`
Expected: 測試 PASS；eslint 無錯（若有 unused import 警告需一併清掉）

- [ ] **Step 3: 跑 build 確認 SSR 沒壞**

Run: `npm run build`
Expected: build 成功（無型別 / import 錯誤）

- [ ] **Step 4: Commit**

```bash
git add src/components/CompanyAndJobTitle/TimeAndSalary/index.js
git commit -m "feat(esg): pass full esgSalaryData to EsgBlock for year filtering"
```

---

## Task 5：整體驗證

- [ ] **Step 1: 全套測試 + lint**

Run: `npm run test`
Expected: lint、stylelint、unit tests 全過

- [ ] **Step 2: 本機手動驗證**

Run: `npm run start`，開 `/companies/{有 ESG 資料的公司}/salary-work-times`
確認：
- 右上角出現年份下拉選單，預設最新年。
- 切換年份 → 四張卡片數值與「YYYY 年」徽章更新。
- 後端尚未 backfill 前，只會有單一年份可選（正常）。

---

## Self-Review 摘要

- **Spec §3.1 local state**：Task 2 用 `useState`，未碰 URL／SSR。✅
- **Spec §3.2 資料流**：Task 4 改傳整包；Desktop/Mobile 以 `{...props}` 透傳 `esgSalaryData`（無需改）。✅
- **Spec §3.3 union / 預設最新 / Select**：Task 1 union+排序、Task 2 預設 `availableYears[0]`、重用 `common/form/Select`。✅
- **Spec §3.4 不動 usePreviewed/SSR**：未修改。✅
- **Spec §7.1 不可假設 [0] 最新**：`getAvailableYears` 自行排序。✅
- **Spec §7.2 年份不一致用 union、缺則隱藏卡片**：Task 1 union、Task 2 `&&` 條件渲染。✅
- **Spec §7.3 無資料避免空選單**：`availableYears.length > 0` 才渲染 Select。✅
