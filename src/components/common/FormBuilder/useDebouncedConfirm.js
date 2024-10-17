import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'react-use';

const useDebouncedConfirm = (onConfirm, delay) => {
  // 使用者確認作答完成
  const [confirmed, setConfirmed] = useState(false);

  // 作答完成後延遲一段時間才觸發 onConfirm
  const [debouncedConfirmed, setDebouncedConfirmed] = useState(false);
  useDebounce(() => setDebouncedConfirmed(confirmed), delay, [confirmed]);
  useEffect(() => {
    if (debouncedConfirmed) {
      setConfirmed(false);
      setDebouncedConfirmed(false);
      if (onConfirm) onConfirm();
    }
  }, [debouncedConfirmed]); // eslint-disable-line react-hooks/exhaustive-deps

  // 僅暴露確認作答完成的函數給外界使用
  const confirm = useCallback(() => setConfirmed(true), []);
  return confirm;
};

export default useDebouncedConfirm;
