# TypeForm 與 Question 架構

## 概覽

使用者提交體驗（薪資、評價、面試、制度…）的彈窗表單統稱 TypeForm，位於
`src/components/ShareExperience/<FormName>/TypeForm.js`。每個 TypeForm 由一個
`questions` 陣列驅動，透過通用的 `FormBuilder` 逐頁渲染並送出。

---

## TypeForm 的組成

每個 TypeForm 包含三個部分：

1. **`questions` 陣列** — 由 question creator 函式組合而成
2. **`bodyFromDraft`** — 將 draft state 轉換為 API request body 的函式
3. **`SubmittableFormBuilder`** — 通用表單容器，負責分頁、驗證、送出與跳轉

---

## Question Creator

Question creator 是定義在 `src/components/ShareExperience/questionCreators.js` 的函式，
回傳一個 config 物件，描述題目的類型（`QUESTION_TYPE`）、對應的 draft key（`dataKey`）、
預設值、驗證邏輯、選項與其他顯示參數。

公司名稱、職稱、廠區等跨表單共用的題目有現成的 creator 可直接引用，無需重新定義。

---

## 新增表單的步驟

1. 在 `src/components/ShareExperience/<FormName>/TypeForm.js` 建立表單
2. 在 `constants.js` 新增對應的 `DATA_KEY_*` 常數
3. 在 `questionCreators.js` 新增 question creator（或直接複用現有的）
4. 在 `ShareExpSection/shareLinkTo.js` 新增 `STATE_SHARE.*` 與 `generateShare*()` 函式
5. 在 `ShareExpSection/index.js` 新增入口卡片
6. 在 `App/index.js` 引入 TypeForm 並加入對應的 modal 渲染
