import { useCallback, useEffect, useState } from 'react';

const NON_TEXT_INPUT_TYPES = [
  'checkbox',
  'radio',
  'button',
  'submit',
  'reset',
  'file',
  'range',
  'color',
  'hidden',
  'image',
];

const isTextEntryElement = el =>
  !!el &&
  (el.tagName === 'TEXTAREA' ||
    (el.tagName === 'INPUT' &&
      !NON_TEXT_INPUT_TYPES.includes((el.type || '').toLowerCase())));

const useIsTyping = () => {
  const [isTyping, setTyping] = useState(false);

  const handleFocus = useCallback(
    e => setTyping(isTextEntryElement(e.target)),
    [],
  );

  const handleBlur = useCallback(() => setTyping(false), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isTyping && !isTextEntryElement(document.activeElement)) {
      setTyping(false);
    }
  });

  return [isTyping, handleFocus, handleBlur];
};

export default useIsTyping;
