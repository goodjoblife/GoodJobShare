import { DependencyList, useCallback, useRef, useState } from 'react';
import { useMountedState } from 'react-use';

import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
} from 'utils/fetchBox';

/**
 * 類似 react-use 的 useAsyncFn，但狀態是 FetchBox。
 * - refetch 時保留上一次的 data（toFetching）
 * - unmount 後或有較新的呼叫時，忽略舊請求的結果
 */
const useAsyncBoxFn = <T, Args extends unknown[]>(
  fn: (...args: Args) => Promise<T>,
  deps: DependencyList,
): readonly [FetchBox<T>, (...args: Args) => Promise<void>] => {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  const [box, setBox] = useState<FetchBox<T>>(getUnfetched<T>());

  const callback = useCallback(
    async (...args: Args): Promise<void> => {
      const callId = ++lastCallId.current;
      const isLatest = (): boolean =>
        isMounted() && callId === lastCallId.current;

      setBox(prevBox => toFetching(prevBox));
      try {
        const data = await fn(...args);
        if (isLatest()) {
          setBox(getFetched(data));
        }
      } catch (error) {
        if (isLatest()) {
          setBox(getError<T>(error));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  return [box, callback] as const;
};

export default useAsyncBoxFn;
