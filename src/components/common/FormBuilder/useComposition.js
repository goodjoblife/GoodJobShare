import { useState } from 'react';

export default () => {
  const [isComposing, setComposing] = useState(false);
  const handleCompositionStart = () => setComposing(true);
  const handleCompositionEnd = () => setComposing(false);
  return [isComposing, handleCompositionStart, handleCompositionEnd];
};
