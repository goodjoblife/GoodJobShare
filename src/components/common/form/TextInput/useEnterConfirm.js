import { useCallback, useState } from 'react';
import { useKey } from 'react-use';

export default ({ onCompositionStart, onCompositionEnd, onEnter }, ref) => {
  const [isComposing, setComposing] = useState(false);
  const handleCompositionStart = useCallback(
    e => {
      setComposing(true);
      if (onCompositionStart) onCompositionStart(e);
    },
    [onCompositionStart],
  );
  const handleCompositionEnd = useCallback(
    e => {
      setComposing(false);
      if (onCompositionEnd) onCompositionEnd(e);
    },
    [onCompositionEnd],
  );

  useKey(
    'Enter',
    e => {
      if (!isComposing && onEnter) {
        onEnter(e);
      }
    },
    { target: ref.current },
    [isComposing, onEnter],
  );

  return [handleCompositionStart, handleCompositionEnd];
};
