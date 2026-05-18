# Company & JobTitle 頁面架構 Convention

## 概覽

公司頁（Company）與職稱頁（JobTitle）共用一套 UI，架構分成兩層：

- **`src/pages/Company/`** 和 **`src/pages/JobTitle/`** — Provider 層，負責 data fetching
- **`src/components/CompanyAndJobTitle/`** — 共用 UI 層，純展示

---

## `components/CompanyAndJobTitle/` — 共用 UI 層

這裡的元件是**純 UI**，不做 Redux dispatch、data fetching，也不讀取 route params。所有資料由 Provider 透過 props 傳入，其中 `pageType` 與 `pageName` 是頂層 UI 元件的標準 props。

---

## `pages/Company/` 與 `pages/JobTitle/` — Provider 層

負責讀取 route params、dispatch Redux actions、掛 `fetchData`（SSR 用，見 [ssr-fetch-data.md](ssr-fetch-data.md)），再將資料傳給對應的 UI 元件。Provider 不應包含任何 UI 邏輯。

取得 route param 時，每個目錄各有一組雙匯出：hook（給 component 用）與 selector（給 `fetchData` 的 SSR 環境用）。例如 `useCompanyName` / `companyNameSelector`、`useJobTitle` / `jobTitleSelector`。

---

## `src/constants/companyJobTitle.ts` — 共用常數與 URL 工具

架構的單一真相來源，定義 `PageType`、`TabType`、`Aspect` 等 enum 及文案對應，並提供 URL 生成工具函式。新增 tab 或調整 URL 結構時，從這裡改起。

---

## 新增 tab 的步驟

1. 在 `components/CompanyAndJobTitle/` 建立 UI 元件
2. 在 `pages/Company/` 與 `pages/JobTitle/` 各新增對應 Provider，掛上 `fetchData`
3. 在 `src/routes.js` 的 Company 與 JobTitle route 群組各加入新路由
