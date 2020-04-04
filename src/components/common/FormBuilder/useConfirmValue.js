import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from 'react-use';

const useConfirmValue = (value, onConfirm, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useDebounce(() => setDebouncedValue(value), delay, [value]);
  const [inputChanged, setInputChanged] = useState(false);
  useEffect(() => {
    if (inputChanged) {
      setInputChanged(false);
      onConfirm();
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps
  const markInputChanged = useCallback(() => setInputChanged(true), []);
  return markInputChanged;
};

export default useConfirmValue;
