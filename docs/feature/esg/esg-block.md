# EsgBlockRoot — 程式碼考古紀錄

> 功能：ESG 公開薪資揭露區塊，顯示公司在臺灣證交所申報的員工薪資統計數據（員工薪資平均數、非主管全時員工薪資平均數/中位數、管理職女性主管佔比）。

---

## (1) Component 定義位置

**`EsgBlockRoot`** 定義於：
`src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/index.js:8`

對應 route（`src/routes.js:136-138`）：
```
path: /companies/:companyName/salary-work-times
component: CompanyTimeAndSalaryProvider
```

**fetchData SSR 方法** 掛在 Provider（非 EsgBlockRoot 本身）：
`src/pages/Company/CompanyTimeAndSalaryProvider.js:197` — 靜態方法 `CompanyTimeAndSalaryProvider.fetchData`，在 SSR 時預先 dispatch `queryCompanyEsgSalaryData`。

---

## (2) 呼叫鏈

```
src/routes.js:136
  → CompanyTimeAndSalaryProvider (pages/Company/CompanyTimeAndSalaryProvider.js)
      ├── useEffect → dispatch(queryCompanyEsgSalaryData) [actions/company.js:396]
      │     ├── 快取判斷：isFetching/isFetched early return
      │     ├── dispatch setEsgSalaryData(toFetching())
      │     ├── queryCompanyEsgSalaryDataApi [apis/queryCompanyEsgSalaryData.ts:59]
      │     │     └── graphqlClient [utils/graphqlClient]
      │     │           └── GraphQL: company(name).esgSalaryData { ... }
      │     └── dispatch setEsgSalaryData(getFetched(data))
      │           → SET_COMPANY_ESG_SALARY_DATA [reducers/companyIndex.ts:274]
      │                 → state.companyIndex.esgSalaryData[companyName]
      │
      ├── useEsgSalaryDataBox(companyName) [CompanyTimeAndSalaryProvider.js:72]
      │     └── useSelector(companyEsgSalaryDataBoxSelectorByName) [selectors/companyAndJobTitle.ts:76]
      │
      └── <TimeAndSalary esgSalaryDataBox={...} /> [components/CompanyAndJobTitle/TimeAndSalary/index.js:41]
            └── pageType === COMPANY → <BoxRenderer box={esgSalaryDataBox} render={data => ...}>
                  └── 解構 data 取各 [0] → <EsgBlock ...props />
                        ↓ (EsgBlock = EsgBlockRoot via re-export)
                  EsgBlockRoot [EsgBlock/index.js:8]
                    └── useMobile() → media query (max-width: 850px)
                          ├── mobile → <EsgBlockMobile>
                          │     └── usePreviewed() → useLocalStorage('esgPreviewedYearByPageName')
                          │           └── useCompanyName() [pages/Company/useCompanyName.js]
                          │     → <GradientMask> + 展開按鈕 → <EsgBlock showsToggle={hasPreviewed}>
                          └── desktop → <EsgBlockDesktop>
                                └── usePreviewed() (同上)
                                → useEffect 初次進入自動 setPreviewed(true)
                                → <EsgBlock hasPreviewed={hasPreviewed}>
```

---

## (3) 關鍵檔案清單

| 檔案 | 職責 |
|------|------|
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/index.js` | **EsgBlockRoot**：依螢幕寬度分派 Desktop / Mobile |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.js` | 核心展示元件：`EsgItemBlock` 卡片清單 + 折疊邏輯 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlockDesktop.js` | Desktop wrapper：初次進入自動展開（`useEffect → setPreviewed(true)`） |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlockMobile.js` | Mobile wrapper：初次進入以 `GradientMask` 遮蓋，按「展開」才展開 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/usePreviewed.js` | 以 `companyName + 當年年份` 為 key，記錄使用者是否已展開過（`localStorage`） |
| `src/components/CompanyAndJobTitle/TimeAndSalary/EsgBlock/EsgBlock.module.css` | EsgBlock 所有樣式 |
| `src/components/CompanyAndJobTitle/TimeAndSalary/index.js` | `TimeAndSalary` 區塊：接收 `esgSalaryDataBox`，僅 `PageType.COMPANY` 才渲染 EsgBlockRoot |
| `src/pages/Company/CompanyTimeAndSalaryProvider.js` | Provider：dispatch action、讀 Redux state、傳入 `TimeAndSalary`、掛 `fetchData` SSR |
| `src/actions/company.js:390-422` | `queryCompanyEsgSalaryData` thunk：含快取判斷，定義 `SET_COMPANY_ESG_SALARY_DATA` action |
| `src/apis/queryCompanyEsgSalaryData.ts` | GraphQL 查詢函式 + `ESGSalaryData` TypeScript 型別 export |
| `src/reducers/companyIndex.ts:274-288` | 處理 `SET_COMPANY_ESG_SALARY_DATA`，存入 `state.companyIndex.esgSalaryData[companyName]` |
| `src/selectors/companyAndJobTitle.ts:76-79` | `companyEsgSalaryDataBoxSelectorByName`：取 Redux state 中的 fetchBox |

---

## (4) 對外依賴

**GraphQL query**（`src/apis/queryCompanyEsgSalaryData.ts:3`）：
```graphql
query($companyName: String!) {
  company(name: $companyName) {
    esgSalaryData {
      avgSalaryStatistics { year, average, sameIndustryAverage }
      nonManagerAvgSalaryStatistics { year, average, sameIndustryAverage }
      nonManagerMedianSalaryStatistics { year, median }
      femaleManagerStatistics { year, percentage }
    }
  }
}
```

**src/apis/ 使用**：`apis/queryCompanyEsgSalaryData`（直接呼叫 `graphqlClient`）

**共用 package / hooks**：
- `react-use` → `useLocalStorage`（`usePreviewed.js`）
- `hooks/useMobile`
- `pages/Company/useCompanyName`
- `utils/fetchBox`（`isFetching` / `isFetched` / `toFetching` / `getFetched` / `getError`）
- `common/StatusRenderer`（`BoxRenderer`）

**環境變數 / feature flag**：無。ESG block 顯示與否純由 `pageType === PageType.COMPANY` 控制。

---

## (5) 專案慣例

- **Root 後綴**：`EsgBlockRoot`（`index.js` 預設匯出）表示「根元件，負責 RWD 分派」，Desktop / Mobile 分離是此 codebase 慣用拆法
- **fetchBox pattern**：action 先讀 selector 判快取，再 dispatch `toFetching()`；component 層用 `BoxRenderer` 包裝，不直接 handle loading/error 狀態
- **fetchData SSR**：靜態方法掛在 Provider（不在子 component），接受 `{ store: { dispatch }, ...props }`，回傳 `Promise.all([...])`
- **型別定義同 API 檔**：`ESGSalaryData` type 定義在 `apis/queryCompanyEsgSalaryData.ts` 並 export，reducer 直接 import 使用
- **CSS Module**：全部用 `styles.xxx` 存取；跨元件共用樣式（如 `overviewStyles.title`）直接 import 另一個 module

---

## (6) 容易踩的坑

1. **`esgSalaryData` 各欄位是陣列、但 `TimeAndSalary/index.js` 只取 `[0]`**（`index.js:48-56`）。後端若回傳空陣列，`avgSalaryStatisticsItem` 等全為 `undefined`，`EsgBlock` 內不渲染任何 `EsgItemBlock`，但整個 Card 容器（含「企業ESG公開薪資揭露」標題）仍會出現，形成空白區塊。

2. **`usePreviewed` 是 client-only（`localStorage`），SSR 端初始值為 `{}`**，故 `hasPreviewed` SSR 端永遠是 `false`。Desktop 版靠 `useEffect` 在 mount 後立即設 `true`，但這會造成一個 re-render（React 18 下若 hydration 狀態不一致可能觸發 hydration warning）。

3. **ESG block 只在 `PageType.COMPANY` 顯示**（`TimeAndSalary/index.js:41`），但 `TimeAndSalary` component 同時被 Company 和 JobTitle 頁使用。若之後要在 JobTitle 也顯示 ESG，需要在對應 Provider 也 dispatch action 並傳入 box，不能只改 `EsgBlock` 這層。
