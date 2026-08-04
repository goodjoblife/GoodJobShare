# Company & JobTitle 頁面架構 Convention

## 概覽

公司頁（Company）與職稱頁（JobTitle）共用一套 UI，架構分成兩層：

- **`src/pages/Company/`** 和 **`src/pages/JobTitle/`** — Provider 層，負責 data fetching
- **`src/components/CompanyAndJobTitle/`** — 共用 UI 層，公司頁與職稱頁共用

一頁的渲染鏈固定是「身分 → 外框 → 內容」：

```
routes.js  /companies/:companyName
└─ CompanyOverviewProvider          讀 route param、dispatch query、掛 fetchData
   └─ CompanyPage                   提供 PageContext，並渲染共用外框
      └─ CompanyAndJobTitleWrapper  麵包屑、標題、tab 列
         └─ Overview                內容元件，只收自己要用的資料
```

Provider 的 render 因此讀得出整頁的組成：

```tsx
<CompanyPage tabType={TabType.OVERVIEW}>
  <Overview boxSelector={boxSelector} statisticsBox={statisticsBox} />
</CompanyPage>
```

---

## `components/CompanyAndJobTitle/` — 共用 UI 層

這裡的元件由 Provider 透過 props 取得**資料**（box、selector、分頁參數…），**頁面身分**（`pageType` / `pageName` / `tabType`）則來自 `PageContext`，不必逐層傳。

內容元件不渲染 `CompanyAndJobTitleWrapper` —— 外框由 Provider 端的 `CompanyPage` / `JobTitlePage` 負責。內容元件回傳自己的片段即可。

### 不讀取 route params

UI 層元件**一律不讀 route params**（`useParams`、`useCompanyName`、`useJobTitle`）。

這條規則的理由具體：這些元件多半同時服務公司頁與職稱頁，讀 `companyName` 在職稱頁會拿到 `decodeURIComponent(undefined)` 的結果 —— 字串 `"undefined"` —— 而型別仍是 `string`，TypeScript 攔不到，接著被當成 redux key 與 `generatePath` 的參數靜靜往下傳。

要公司名的元件有兩條路，選哪一條見下方 `PageContextProvider` 一節。

### 可以讀 Redux，不要在這裡寫

以 `useSelector` **讀取** store 是允許的，這層有數個元件這樣做（`PageBoxRenderer`、`StatisticsCard`、`AspectScoreCard`、`Overview/Helmet`）。

**dispatch 應該留在 Provider 層**。目前唯一的例外是 `SubscribeNotificationButton` —— 訂閱這個動作本來就發生在按鈕上，沒有適合的 Provider 承接。新增互動時先考慮把 dispatch 往 Provider 推，確定推不動再比照辦理。

### `PageContextProvider` — 頁面身分

`CompanyPage` / `JobTitlePage` 提供 `PageContext`，內容是 `{ pageType, pageName, tabType }` —— 三者都由 route 決定、在頁面生命週期內固定。UI 層任何元件都可以 `usePageContext()` 取得。

- **它不是資料通道**。除了頁面身分之外的資料，一律走 props。
- `useCompanyName()`（`components/CompanyAndJobTitle/PageContextProvider`，與 `pages/Company/useCompanyName` 同名但不同來源）在非公司頁會 throw。這是刻意的：需要公司名的元件若被掛到職稱頁，應該當場失敗，而不是靠「redux 剛好查無資料」而看起來正常。
- 反過來說，**同時服務兩種頁面、只在公司頁多顯示一塊**的元件不該用它，而該由呼叫端傳 `companyName` prop（見 `AspectScoreCard` 與 `SummaryBlock`）。這樣「職稱頁沒有這一塊」在呼叫端就看得出來。

---

## `pages/Company/` 與 `pages/JobTitle/` — Provider 層

負責讀取 route params、dispatch Redux actions、掛 `fetchData`（SSR 用，見 [ssr-fetch-data.md](ssr-fetch-data.md)），再將資料傳給對應的 UI 元件。

Provider 不寫 UI 邏輯，但**負責組合**：把內容元件包進 `CompanyPage` / `JobTitlePage`。

### `CompanyPage` / `JobTitlePage`

兩個對稱的薄元件，各自把「頁面身分 + 共用外框」收在一起：

```tsx
<PageContextProvider pageType={PageType.COMPANY} pageName={companyName} tabType={tabType}>
  <CompanyAndJobTitleWrapper>{children}</CompanyAndJobTitleWrapper>
</PageContextProvider>
```

`pageType` 由檔案本身決定，`pageName` 讀自 route param，`tabType` 由 Provider 指定。放在這一層有兩個理由：`tabType` 是 route 的性質，不該先傳給內容元件再轉手給外框；而內容元件因此位於 context 之內，不必逐層收 `pageType` / `pageName`。

### route param 的雙匯出

每個目錄各有一組：hook（給 component 用）與 selector（給 `fetchData` 的 SSR 環境用）。例如 `useCompanyName` / `companyNameSelector`、`useJobTitle` / `jobTitleSelector`。

這組雙匯出**只在 Provider 層使用**。`useCompanyName` 在 param 不存在時會 throw，而不是回傳字串 `"undefined"`；掛在 `/companies/:companyName` 之下的 Provider 必然滿足，掛錯地方則當場失敗。

UI 層若要公司名，用 `PageContextProvider` 的同名 hook，不要 import 這一個。

---

## `src/constants/companyJobTitle.ts` — 共用常數與 URL 工具

架構的單一真相來源，定義 `PageType`、`TabType`、`Aspect` 等 enum 及文案對應，並提供 URL 生成工具函式。新增 tab 或調整 URL 結構時，從這裡改起。

---

## 新增 tab 的步驟

1. 在 `constants/companyJobTitle.ts` 加上新的 `TabType` 與對應的 URL 工具
2. 在 `components/CompanyAndJobTitle/` 建立 UI 元件。不渲染外框，頁面身分用 `usePageContext()`
3. 在 `pages/Company/` 與 `pages/JobTitle/` 各新增對應 Provider，掛上 `fetchData`，render 包成 `<CompanyPage tabType={…}><新元件 …/></CompanyPage>`
4. 在 `src/routes.js` 的 Company 與 JobTitle route 群組各加入新路由
