# 計畫 B — ESG 2024/2025 Backfill（後端）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 2024、2025 的證交所 ESG 公開薪資資料清洗後寫入 MongoDB `companyESGData`，讓 GraphQL 回得到多年份資料。

**Architecture:** 沿用 `companyESG` repo 的 folder-per-year 清洗 notebook 產出各年 `data.json`；在 `WorkTimeSurvey-backend` 新增「讀全部年份 → 以 businessNumber 合併 → 對應 canonicalCompany._id → 整份 upsert」的插入腳本。合併邏輯抽成純函式以利測試。

**Tech Stack:** Jupyter + pandas（清洗）、Node.js + mongoose（插入）、mocha + chai（測試）。

**Repo / 工作目錄:**
- 清洗：`/Users/yong/Documents/workspace/goodjoblife/companyESG`
- 插入：`/Users/yong/Documents/workspace/WorkTimeSurvey-backend`

---

## File Structure

| 檔案 | 動作 | 職責 |
|------|------|------|
| `companyESG/2024/`（notebook + 4 原始檔 + `data.json`） | Create | 2024 清洗，產出 `2024/data.json` |
| `companyESG/2025/`（notebook + 4 原始檔 + `data.json`） | Create | 2025 清洗，產出 `2025/data.json` |
| `WorkTimeSurvey-backend/scripts/esg/mergeEsgData.js` | Create | 純函式：依 businessNumber 合併多年份 esgData |
| `WorkTimeSurvey-backend/scripts/esg/mergeEsgData.test.js` | Create | 合併純函式 mocha 測試 |
| `WorkTimeSurvey-backend/scripts/backfillCompanyESGData.js` | Create | 讀 data.json → 對應 → upsert 進 `companyESGData` |

---

## 前置知識（給零脈絡的人）

- `companyESG/2023/2023.ipynb` 是既有範本：讀 4 個 OpenAPI 原始檔（上市 `t187ap46_L_5` 人力發展 + `t187ap03_L` 基本資料；上櫃 `t187ap46_O_5` + `mopsfin_t187ap03_O`），算同產業平均，輸出 `data.json`。
- `data.json` 是 list，每筆形狀：
  ```json
  {
    "businessNumber": "...", "stockId": "...", "stockName": "...",
    "fullStockName": "...", "industryCode": "...",
    "esgData": {
      "avgSalaryStatistics": [{ "year": 2023, "average": 0, "sameIndustryAverage": 0 }],
      "nonManagerAvgSalaryStatistics": [{ "year": 2023, "average": 0, "sameIndustryAverage": 0 }],
      "nonManagerMedianSalaryStatistics": [{ "year": 2023, "median": 0 }],
      "femaleManagerStatistics": [{ "year": 2023, "percentage": 0 }]
    }
  }
  ```
- MongoDB `companyESGData` collection：每間公司一份 document，`_id` = `canonicalCompany._id`，內含四個跨年份陣列。
- `canonicalCompany` 有 indexed `businessNumber` 與 `companyAlias.businessNumber`，是 ESG 資料對應公司的橋樑。
- 單位換算：人力發展表單位「仟元/人」，notebook `× 1000` 存「元」；百分比 `xx%` → `/100` float。

---

## Task 1：產出 `2024/data.json`

**Files:**
- Create: `companyESG/2024/`（4 個原始檔、notebook、`data.json`）

> 此為資料清洗，無自動化單元測試，驗收以 `data.json` 內容檢查為準。

- [ ] **Step 1: 下載 2024 原始檔**

從 OpenAPI 下載 2024 年度四個來源，存到 `companyESG/2024/`，檔名沿用 2023：
- `t187ap46_L_5`（上市 人力發展，https://openapi.twse.com.tw/v1/opendata/t187ap46_L_5 ）
- `t187ap03_L`（上市 基本資料）
- `t187ap46_O_5`（上櫃 人力發展，TPEX，檔名沿用 2023 的 `t187ap46_0_5`）
- `mopsfin_t187ap03_O`（上櫃 基本資料）

> 注意：證交所 API 通常回「最新一期」。若 API 無法指定 2024 年度、回的是其他年度，需確認 `報告年度` 欄位後再決定來源。對不到 2024 時於 Step 4 修正。

- [ ] **Step 2: 複製並調整 notebook**

把 `companyESG/2023/2023.ipynb` 複製成 `companyESG/2024/2024.ipynb`，將 `year = 2023` 改為 `year = 2024`，其餘清洗/同產業平均/輸出邏輯不變。

- [ ] **Step 3: 執行 notebook 產出 `2024/data.json`**

在 `companyESG/2024/` 跑完整 notebook，產出 `2024/data.json`。

- [ ] **Step 4: 驗收 data.json**

檢查：
- 是非空 list，筆數量級與 2023 相近。
- 任取一筆，`esgData.avgSalaryStatistics[0].year === 2024`。
- `average` 為「元」量級（六~七位數），非「仟元」。
- `femaleManagerStatistics[0].percentage` 在 [0, 1]。

- [ ] **Step 5: Commit（在 companyESG repo）**

```bash
cd /Users/yong/Documents/workspace/goodjoblife/companyESG
git add 2024
git commit -m "feat: add 2024 ESG data"
```

---

## Task 2：產出 `2025/data.json`

**Files:**
- Create: `companyESG/2025/`（4 個原始檔、notebook、`data.json`）

- [ ] **Step 1: 下載 2025 原始檔** — 同 Task 1 Step 1，存到 `companyESG/2025/`。
- [ ] **Step 2: 複製 notebook** — `2023.ipynb` → `2025/2025.ipynb`，`year = 2025`。
- [ ] **Step 3: 執行 notebook** — 產出 `2025/data.json`。
- [ ] **Step 4: 驗收** — 同 Task 1 Step 4，但檢查 `year === 2025`。
- [ ] **Step 5: Commit**

```bash
cd /Users/yong/Documents/workspace/goodjoblife/companyESG
git add 2025
git commit -m "feat: add 2025 ESG data"
```

---

## Task 3：合併純函式 `mergeEsgData`

**Files:**
- Create: `WorkTimeSurvey-backend/scripts/esg/mergeEsgData.js`
- Test: `WorkTimeSurvey-backend/scripts/esg/mergeEsgData.test.js`

工作目錄：`/Users/yong/Documents/workspace/WorkTimeSurvey-backend`

- [ ] **Step 1: 寫失敗測試**

`scripts/esg/mergeEsgData.test.js`：

```js
const { assert } = require("chai");
const { mergeEsgDataByBusinessNumber } = require("./mergeEsgData");

describe("mergeEsgDataByBusinessNumber", () => {
    const rec2023 = {
        businessNumber: "11111111",
        esgData: {
            avgSalaryStatistics: [
                { year: 2023, average: 973000, sameIndustryAverage: 1000000 },
            ],
            nonManagerAvgSalaryStatistics: [],
            nonManagerMedianSalaryStatistics: [{ year: 2023, median: 871000 }],
            femaleManagerStatistics: [{ year: 2023, percentage: 0.189 }],
        },
    };
    const rec2024 = {
        businessNumber: "11111111",
        esgData: {
            avgSalaryStatistics: [
                { year: 2024, average: 1010000, sameIndustryAverage: 1020000 },
            ],
            nonManagerAvgSalaryStatistics: [],
            nonManagerMedianSalaryStatistics: [{ year: 2024, median: 880000 }],
            femaleManagerStatistics: [{ year: 2024, percentage: 0.2 }],
        },
    };

    it("同一公司跨年份合併、由大到小排序", () => {
        const merged = mergeEsgDataByBusinessNumber([rec2023, rec2024]);
        const esg = merged.get("11111111");
        assert.deepEqual(
            esg.avgSalaryStatistics.map(x => x.year),
            [2024, 2023]
        );
        assert.equal(esg.avgSalaryStatistics[0].average, 1010000);
        assert.lengthOf(esg.nonManagerAvgSalaryStatistics, 0);
    });

    it("同年份重複 → 後者覆蓋（idempotent，無重複）", () => {
        const merged = mergeEsgDataByBusinessNumber([rec2024, rec2024]);
        const esg = merged.get("11111111");
        assert.lengthOf(esg.avgSalaryStatistics, 1);
        assert.equal(esg.avgSalaryStatistics[0].year, 2024);
    });

    it("缺 businessNumber 的紀錄略過", () => {
        const merged = mergeEsgDataByBusinessNumber([
            { businessNumber: "", esgData: rec2023.esgData },
        ]);
        assert.equal(merged.size, 0);
    });
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npx mocha scripts/esg/mergeEsgData.test.js`
Expected: FAIL（`Cannot find module './mergeEsgData'`）

- [ ] **Step 3: 寫實作**

`scripts/esg/mergeEsgData.js`：

```js
const STAT_KEYS = [
    "avgSalaryStatistics",
    "nonManagerAvgSalaryStatistics",
    "nonManagerMedianSalaryStatistics",
    "femaleManagerStatistics",
];

const emptyEsgData = () => ({
    avgSalaryStatistics: [],
    nonManagerAvgSalaryStatistics: [],
    nonManagerMedianSalaryStatistics: [],
    femaleManagerStatistics: [],
});

/**
 * @param {Array<{ businessNumber: string, esgData: object }>} records
 * @returns {Map<string, object>} businessNumber -> 合併後 esgData（各陣列依 year 由大到小、去重）
 */
const mergeEsgDataByBusinessNumber = records => {
    const map = new Map();
    for (const rec of records) {
        if (!rec.businessNumber) continue;
        const merged = map.get(rec.businessNumber) || emptyEsgData();
        for (const key of STAT_KEYS) {
            const incoming = (rec.esgData && rec.esgData[key]) || [];
            const byYear = new Map(merged[key].map(e => [e.year, e]));
            for (const item of incoming) byYear.set(item.year, item);
            merged[key] = [...byYear.values()].sort((a, b) => b.year - a.year);
        }
        map.set(rec.businessNumber, merged);
    }
    return map;
};

module.exports = { mergeEsgDataByBusinessNumber, STAT_KEYS };
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npx mocha scripts/esg/mergeEsgData.test.js`
Expected: PASS（3 個 it 全過）

- [ ] **Step 5: Commit**

```bash
git add scripts/esg/mergeEsgData.js scripts/esg/mergeEsgData.test.js
git commit -m "feat(esg): add mergeEsgDataByBusinessNumber helper"
```

---

## Task 4：插入腳本 `backfillCompanyESGData`

**Files:**
- Create: `WorkTimeSurvey-backend/scripts/backfillCompanyESGData.js`

- [ ] **Step 1: 寫腳本**

`scripts/backfillCompanyESGData.js`：

```js
/*
 * 把 companyESG repo 各年份 data.json 合併後寫入 companyESGData collection
 * 執行：
 *   COMPANY_ESG_DIR=/Users/yong/Documents/workspace/goodjoblife/companyESG \
 *   node ./bin/run-script.js ./scripts/backfillCompanyESGData.js
 */
const fs = require("fs");
const path = require("path");
const winston = require("winston");
const { CanonicalCompany, CompanyESGData } = require("../src/models");
const { mergeEsgDataByBusinessNumber } = require("./esg/mergeEsgData");

const YEARS = [2023, 2024, 2025];
const COMPANY_ESG_DIR =
    process.env.COMPANY_ESG_DIR ||
    "/Users/yong/Documents/workspace/goodjoblife/companyESG";

function readAllYearRecords() {
    const records = [];
    for (const year of YEARS) {
        const file = path.join(COMPANY_ESG_DIR, String(year), "data.json");
        if (!fs.existsSync(file)) {
            winston.warn(`skip missing ${file}`);
            continue;
        }
        records.push(...JSON.parse(fs.readFileSync(file, "utf8")));
    }
    return records;
}

async function main() {
    const records = readAllYearRecords();
    const merged = mergeEsgDataByBusinessNumber(records);

    let matched = 0;
    let unmatched = 0;
    const unmatchedNumbers = [];

    for (const [businessNumber, esgData] of merged) {
        const company = await CanonicalCompany.findOne({
            $or: [
                { businessNumber },
                { "companyAlias.businessNumber": businessNumber },
            ],
        }).select("_id");

        if (!company) {
            unmatched += 1;
            unmatchedNumbers.push(businessNumber);
            continue;
        }

        await CompanyESGData.replaceOne(
            { _id: company._id },
            { _id: company._id, ...esgData },
            { upsert: true }
        );
        matched += 1;
    }

    winston.info(`ESG backfill done. matched=${matched} unmatched=${unmatched}`);
    winston.info(`unmatched businessNumbers: ${unmatchedNumbers.join(", ")}`);
}

module.exports = main;
```

- [ ] **Step 2: 起本機 MongoDB**

Run: `docker-compose up -d mongo`
Expected: mongo:4.4 起在 27017（本機 `./data/mongodb` 已含 2023 ESG 與 canonical companies）

- [ ] **Step 3: 跑插入腳本**

Run（在 backend 根目錄；`.env*` 需有 `MONGODB_URI`）:
```bash
COMPANY_ESG_DIR=/Users/yong/Documents/workspace/goodjoblife/companyESG \
node ./bin/run-script.js ./scripts/backfillCompanyESGData.js
```
Expected: log 顯示 `matched=...`、`unmatched=...`，無 exception

- [ ] **Step 4: 重跑驗證 idempotent**

再跑一次 Step 3，`matched` 數字一致。用 mongo shell 抽查一間公司，確認陣列**沒有重複年份**：
```bash
docker-compose exec mongo mongo goodjob --eval \
  'db.companyESGData.findOne({}, {avgSalaryStatistics:1})'
```
Expected: `avgSalaryStatistics` 每個 year 僅出現一次

- [ ] **Step 5: Commit**

```bash
git add scripts/backfillCompanyESGData.js
git commit -m "feat(esg): add backfillCompanyESGData insert script"
```

---

## Task 5：本機 GraphQL 端對端驗證

- [ ] **Step 1: 起後端 server**

Run: `npm run dev`（或 repo README 指定的本機啟動指令）

- [ ] **Step 2: 打 GraphQL 查多年份**

對一間已知有資料的公司（如台泥）查詢：
```graphql
{
  company(name: "台灣水泥股份有限公司") {
    esgSalaryData {
      avgSalaryStatistics { year average sameIndustryAverage }
      nonManagerMedianSalaryStatistics { year median }
      femaleManagerStatistics { year percentage }
    }
  }
}
```
Expected: `avgSalaryStatistics` 等回傳 2023、2024、2025 多筆（視該公司各年資料有無）

- [ ] **Step 3: 串前端驗證（若計畫 A 已完成）**

本機跑 GoodJobShare，開該公司薪資頁，確認下拉選單可選多年、切換正確。

---

## Self-Review 摘要

- **Spec §4.1 folder-per-year 清洗**：Task 1、2 各建 `2024/`、`2025/` folder + notebook + data.json。✅
- **Spec §4.2 read-all-years + 整份 upsert**：Task 4 讀 `YEARS` 全部、`replaceOne(..., {upsert:true})`。✅
- **Spec §4.2 idempotent**：Task 3 同年份去重 + Task 4 Step 4 重跑驗證。✅
- **Spec §4.3 businessNumber 對應 _id**：Task 4 `$or` 查 `businessNumber` / `companyAlias.businessNumber`，`_id = company._id`。✅
- **Spec §7.4 對應不到記錄並略過**：Task 4 收集 `unmatchedNumbers` 並 log。✅
- **Spec §7.5 單位換算**：前置知識段註明「仟元→元 ×1000」，沿用 2023 notebook 邏輯。✅
- **Spec §5 本機測試流程**：Task 4 Step 2-4 + Task 5 涵蓋 docker mongo、插入、GraphQL 驗證。✅
