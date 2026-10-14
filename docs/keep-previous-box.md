# 換頁／換條件時顯示上一筆資料（`useKeepPreviousBox` + `BoxRenderer`）

列表換頁、換篩選時，新的那一組 box 還沒有資料。`useKeepPreviousBox` 在 render 時補上同一個 scope 最後一次的資料，搭配 `BoxRenderer` 顯示「舊內容 + 半透明 overlay + Loader」，而不是整塊變成 Loader。

## Key files

- `src/hooks/useKeepPreviousBox.ts` — 補舊資料的 hook
- `src/components/common/StatusRenderer/BoxesRenderer.tsx` — 依 box 狀態決定畫面

## 與 `BoxRenderer` 的搭配

`BoxesRenderer` 依 box 的 `status` 與 `data` 決定畫面：

| box | 畫面 |
| --- | --- |
| 全部 unfetched | 不渲染 |
| fetching、沒有 data | Loader |
| fetching、有 data | 舊內容 + overlay Loader（載完不淡入） |
| fetched | 內容 |
| error 且沒在 fetching | 不渲染 |

所以只要讓 box 在換條件時「有 data 且 status 是 fetching」，就會走第三列。`useKeepPreviousBox` 做的就是這件事：

- box 已有 data → 原樣回傳，並記住這份 data。
- box 沒有 data、且 `scope` 與上次相同 → 回傳「舊 data + 新 box 的 status」。
- 新 box 是 unfetched 時（action 還沒 dispatch 的那個 render）狀態改成 fetching，避免 `BoxesRenderer` 回傳 null 空白一幀。
- `scope` 變了 → 不補，回到 Loader。

## 用法

```tsx
const selector = useMemo(() => companyIndexesBoxSelectorAtPage(page), [page]);
// scope 代表「哪些 box 算同一份內容」
const box = useKeepPreviousBox(useSelector(selector), 'CompanyIndex');

return <IndexList indexesBox={box} ... />;
```

## `scope`

`scope` 回答的問題是：這次沒有資料的 box，跟上一次有資料的 box，算不算同一份內容？算才沿用舊資料。

- hook 用 `ref` 記住最後一次有資料的 `{ scope, data }`。box 有 data 時更新並原樣回傳（不比對 scope）；沒有 data 時，只在 `previous.scope === scope`（字串全等）才補舊 data。
- 選到「換掉就不該再看到舊內容」的粒度：在這個粒度內換 box（換頁、換篩選）可沿用舊畫面，跨過就不行。

| 用在哪 | `scope` | 理由 |
| --- | --- | --- |
| 公司、職稱列表 | 固定字串（`'CompanyIndex'`、`'JobTitleIndex'`） | 換頁都是同一份列表 |
| 公司的薪資、面試、工作經驗（日後套用時） | `companyName` | 換查詢條件可沿用，換公司不行 |
| 職稱的各分頁（日後套用時） | `jobTitle` | 同上 |

- **換公司一定要換 `scope`**：路由參數改變時元件通常不會 unmount，ref 還在。`scope` 不變的話，新公司載入期間會顯示舊公司的列表，`PageBoxRenderer` 還會因 `data.name !== pageName` 誤 redirect。
- **一個 box 一次 hook 呼叫**：`scope` 只是字串比對，不是 hook 的身份。同一個元件有兩個 box 要保留，要各呼叫一次，不要共用。
- **粒度**：太粗（整個 app 用同一個常數）會把不相關的內容當同一份；太細（把頁碼放進 `scope`）則每次換頁都不補，等於沒用。

## 注意事項

- **標題與頁碼放在 `BoxRenderer` 外面**：它們由 props 決定，常駐顯示；只有依賴 box 的內容放進 `render`。否則第一次載入時標題也會消失。
- **其他依賴同一次查詢的資料要自己保留**：例如列表總數。總數若在換頁時被清成 0，`Pagination` 會消失；做法是 action 只在尚未 fetched 時才把總數標成 fetching。
- **action 用 `toFetching()` 即可**：保留舊畫面交給 hook，不必在 action 帶舊 box。
- **只在 render 時補資料**：store 裡的 box 仍然沒有 data，其他沒用 hook 的元件看到的就是空的 fetching box。
