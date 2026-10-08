# Aspect 值拆分計畫

把 `Aspect` enum 的值從中文文案改成內部識別，讓「顯示文案」「URL」「API 值」各自查表。

**不動 API wire 值** —— 送出與收回的字串維持現在的中文，不需要後端配合。程式碼在邊界加一層轉換。

行號以 `942c69dd` 為準。

---

## 為什麼

現在 `Aspect.MANAGEMENT === '公司管理方式'`，一個字串同時是畫面文案、URL segment、API 值。改其中一個用途會波及另外兩個，而型別看不出來：

- 想把文案改成「管理方式」→ 送給後端的 `aspectFilter.aspect` 跟著變 → 後端查無資料 → 頁面靜靜空掉。
- `Aspect.CULTURE = '公司/團隊文化'` 含斜線，URL 靠 `%2F` 撐著。實測 `generatePath` 會編碼、`matchPath` 仍匹配，但這依賴中間層不把 `%2F` 正規化成 `/`（部分 CDN／反向代理會做）。

同一個檔案裡的 `PageType`、`TabType` 早就是三張表分開的形狀，`Aspect` 是唯一的例外。

---

## 目標形狀

```ts
export enum Aspect {
  GENDER = 'GENDER',
  WORK_LIFE_BALANCE = 'WORK_LIFE_BALANCE',
  // …
}

export const aspectTranslation: Record<Aspect, string> = {
  [Aspect.GENDER]: '性別友善度',   // 只給人看
};

const aspectURLMap: Record<Aspect, string> = {
  [Aspect.GENDER]: 'gender-friendly',   // 只給 URL，完整清單見下一節
};

const aspectAPIMap: Record<Aspect, string> = {
  [Aspect.GENDER]: '性別友善度',   // 只給後端；值與現況相同
};
```

`aspectTranslation` 與 `aspectAPIMap` 目前內容相同，但**不要合併** —— 它們同值是巧合，分開才能各自演進（文案要改字時不會動到 wire 值）。

搭配三個轉換函式，都放在 `constants/companyJobTitle.ts`：

| 函式 | 用途 | 查不到時 |
|---|---|---|
| `generateAspectURL({ pageName, aspect })` | 產生連結，與 `generateTabURL` 對齊 | 型別保證，不會發生 |
| `aspectFromURL(slug)` | route param → `Aspect` | 回傳 `undefined`，由呼叫端決定 redirect 或 404 |
| `aspectFromAPIValue(wire)` | API 回應 → `Aspect` | 回傳 `undefined`，捨棄該筆 |

---

## slug 命名

| `Aspect` | 顯示文案（＝現行 wire 值） | slug |
|---|---|---|
| `GENDER` | 性別友善度 | `gender-friendly` |
| `WORK_LIFE_BALANCE` | 工作與生活平衡 | `work-life-balance` |
| `COMPENSATION` | 薪資福利 | `compensation` |
| `JOB_CONTENT` | 工作內容 | `job-content` |
| `WORK_TIME` | 工時狀況 | `work-time` |
| `CULTURE` | 公司/團隊文化 | `culture` |
| `MANAGEMENT` | 公司管理方式 | `management` |
| `GROWTH` | 獲得的成長 | `growth` |
| `PROMOTION` | 升遷制度 | `promotion` |

規則：全小寫 kebab-case，與既有的 `work-experiences`、`salary-work-times` 一致。

幾個取捨：

- **`compensation`** 而非 `salary-benefits` —— 薪資福利兩者都涵蓋，且避免與分頁的 `salary-work-times` 在語感上打架。
- **`work-time`** 用單數，與分頁 `salary-work-times` 區隔：前者是評價面向，後者是薪資工時分頁。
- **`culture`** 而非 `company-culture` —— 中文是「公司/團隊文化」，兩者都算，slug 取共同概念就好。
- **`gender-friendly`** 與 dev2 新增的性別友善分頁（`/companies/:companyName/gender-friendly`）同字。兩者深度不同（aspect 在 `work-experiences/` 之下），不會撞路由，而且指的本來就是同一個概念，同字比刻意錯開好記。

slug 一旦上線就是對外契約，改動要再留一組 redirect。命名有意見趁還沒實作時提。

### 1. 常數層

| 位置 | 動作 |
|---|---|
| `constants/companyJobTitle.ts:50` | enum 值改內部識別 |
| 同上 | 新增三張表與三個轉換函式 |
| `constants/linkTo/index.js:14` | `companyWorkExperiencesAspectPath` **不動**，只有填進去的值改變 |

### 2. API 邊界（wire 值不變）

| 位置 | 現在 | 改成 |
|---|---|---|
| `actions/company.ts:712` | `aspectFilter: { aspect }` | `aspectFilter: { aspect: aspectToAPIValue(aspect) }` |
| `actions/company.ts:657-660` | 直接把 API 回應存進 redux | 存之前用 `aspectFromAPIValue` 正規化 `companyAspectRatingStatistics[].aspect`，查不到的項目捨棄 |
| `apis/aspectRatingStatistics.ts:23` | `aspect: string` | 不動 —— 這是 wire 型別，本來就該是 string |

`actions/company.ts:657` 是 aspect 統計進 redux 的**唯一入口**，在這裡正規化，下游全部拿到 `Aspect`。

### 3. 顯示點

| 位置 | 現在 | 改成 |
|---|---|---|
| `components/…/Overview/AspectScoreCard.tsx:64` | `title={aspect}` | `title={aspectTranslation[aspect]}` |
| `components/…/WorkExperiences/Aspects/index.tsx:46` | `<Heading>{aspect}</Heading>` | `aspectTranslation[aspect]` |

### 4. 比對點（正規化之後自動修好）

`AspectScoreCard.tsx:32,41` 與 `Aspects/index.tsx:54` 的 `item.aspect === aspect` 在第 2 步之後是 `Aspect` 對 `Aspect`，不必改。`AspectScoreCard.tsx:41` 的 `stat.aspect as Aspect` 裸 cast 可以刪掉 —— 那個 cast 現在讓後端回傳任何字串都能冒充 `Aspect`。

### 5. URL 解析

| 位置 | 動作 |
|---|---|
| `pages/Company/useAspect.tsx` | 改名 `useAspectParam.ts`（與 `useCompanyNameParam` / `useJobTitleParam` 對齊），提供 `useAspectSlugParam`（原始 slug）與 `aspectSelector`（SSR 的 `fetchData` 用，用 `aspectFromURL` 反查）。Provider 先看 slug 才決定渲染、redirect 或 NotFound，所以不提供直接回傳 `Aspect` 的 hook |
| 同上 | 移除 `(aspect ? decodeURIComponent(aspect) : '') as Aspect` —— param 缺少時丟錯；壞掉的百分號編碼退回原字串（查不到，走 NotFound），不丟 `URIError` |
| `pages/Company/CompanyWorkExperiencesAspectProvider.tsx:30,71,129` | 更新 import 與呼叫 |
| `components/…/Overview/AspectScoreCard.tsx:56` | `generatePath(...)` 改用 `generateAspectURL` |

---

## 舊網址相容

中文網址已在外流傳（分享連結、搜尋結果），不能直接失效。`routes.js` 已有 `companyOverviewLegacyPath` 的 redirect 先例，比照處理：

```
aspectFromURL(slug) 命中        → 正常渲染
slug 是合法的舊中文值           → 301 導到英文 slug
兩者皆非                        → NotFound
```

第三種情況順帶解掉現在的行為：非法 aspect 會渲染出一個標題寫著該字串、內容空白的頁面。

---

## 範圍外

- **`aspect` 要不要進 context** —— 獨立議題。目前 UI 層只有 `AspectSection` 一個消費者，不值得開 context；等第二個消費者出現再談。
- **experience section 的 aspect** —— `apis/experience.ts:20` 的 `SectionWithRating.aspect` 是同一套詞彙，但目前不與 `Aspect` enum 交叉比對，本次不動。日後若要比對，用同一張 `aspectFromAPIValue`。
- **後端改用英文 enum** —— 真的要做時，只需改 `aspectAPIMap` 一張表。本計畫的目的就是把成本壓到這裡。
