# React Component 慣例

## 元件命名

Function component 一律使用 PascalCase。

元件若放在獨立資料夾下，**匯出的元件名稱必須與資料夾名稱相同**：

```js
// ✓
// EsgBlock/index.ts
export default EsgBlock;

// ✗ — 名稱與資料夾不符，會造成混淆
// EsgBlock/index.ts
export default EsgBlockRoot;
```

同一資料夾內不得有兩個同名的元件。若 `index.ts` 與子檔案都定義了同名元件，需給其中一個更精確的名字：

```js
// ✗ — InterviewExperiences/index.ts 與 InterviewExperiences/InterviewExperiences.js
//     都叫 InterviewExperiences，只能靠 import alias 迴避，難以分辨兩者角色
import InterviewExperiencesSection from './InterviewExperiences'; // 用別名繞過衝突
const InterviewExperiences = ...

// ✓ — page-level wrapper 應有明確的名字
// InterviewExperiencesPage.js
const InterviewExperiencesPage = ...
```

---

## 檔名

- **元件檔**：PascalCase（`StatisticsCard.tsx`、`WorkExperiences.js`）
- **非元件檔**（hooks、utilities、helpers）：camelCase（`useXxx.js`、`helper.js`、`formatter.js`）
- **資料夾**：PascalCase。`common/` 下現有的 lowercase 目錄（`button/`、`icons/` 等）是歷史遺留，新目錄一律用 PascalCase。

---

## `index.ts` 用法

`index.ts` 的唯一職責是 re-export，**不放元件 body**。元件本身放在與資料夾同名的 `.js` / `.tsx` 檔案：

```
// ✓
StatisticsCard/
  StatisticsCard.tsx   ← 元件 body
  index.ts             ← 只做 re-export

// ✗ — 元件 body 放在 index.ts，定義與入口職責混在一起
StatisticsCard/
  index.ts
```

`index.ts` 內容固定如下，不放任何邏輯：

```js
import StatisticsCard from './StatisticsCard';
export default StatisticsCard;
```

若資料夾是多個子元件的純分組，沒有代表性的「根元件」，改用 named export barrel：

```js
// common/base/index.ts
export { default as Wrapper } from './Wrapper';
export { default as Section } from './Section';
```
