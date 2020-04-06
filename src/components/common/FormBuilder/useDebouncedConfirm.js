import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'react-use';

const useDebouncedConfirm = (onConfirm, delay) => {
  const [confirmed, setConfirmed] = useState(false);
  const [debouncedConfirmed, setDebouncedConfirmed] = useState(false);
  useDebounce(() => setDebouncedConfirmed(confirmed), delay, [confirmed]);
  useEffect(() => {
    if (debouncedConfirmed) {
      setConfirmed(false);
      setDebouncedConfirmed(false);
      onConfirm();
    }
  }, [debouncedConfirmed]); // eslint-disable-line react-hooks/exhaustive-deps
  const confirm = useCallback(() => setConfirmed(true), []);
  return confirm;
};

export default useDebouncedConfirm;
