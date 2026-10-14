import { useRef } from 'react';

import { FetchStatus } from 'constants/fetchStatus';
import FetchBox, { isUnfetched } from 'utils/fetchBox';

// 新的 box 還沒有資料（例如換了查詢參數、對應的 key 尚未 fetch）時，
// 沿用同一個 scope 下最後一次有資料的 box 的 data，狀態仍沿用新 box 的，
// 讓 BoxesRenderer 走 FETCHING-with-stale-data 而不是閃成 Loader。
// 新 key 在 action dispatch 之前是 unfetched，而 BoxesRenderer 對 unfetched 回傳 null，
// 所以有舊資料時把 unfetched 視為 fetching，避免空白一幀。
// scope 改變（例如換了公司）就丟掉舊資料，避免顯示別人的資料。
const useKeepPreviousBox = <T>(
  box: FetchBox<T>,
  scope: string,
): FetchBox<T> => {
  const previousRef = useRef<{ scope: string; data: T } | null>(null);

  if (box.data !== undefined) {
    previousRef.current = { scope, data: box.data };
    return box;
  }

  const previous = previousRef.current;
  if (previous && previous.scope === scope) {
    return {
      ...box,
      status: isUnfetched(box) ? FetchStatus.FETCHING : box.status,
      data: previous.data,
    };
  }
  return box;
};

export default useKeepPreviousBox;
