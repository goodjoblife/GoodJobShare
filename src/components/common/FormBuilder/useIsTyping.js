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

// 會叫出手機虛擬鍵盤的元素
const isTextEntryElement = el =>
  !!el &&
  (el.tagName === 'TEXTAREA' ||
    (el.tagName === 'INPUT' &&
      !NON_TEXT_INPUT_TYPES.includes((el.type || '').toLowerCase())));

// 偵測容器內是否有文字輸入框正在輸入，回傳 [isTyping, onFocus, onBlur]
const useIsTyping = () => {
  const [isTyping, setTyping] = useState(false);

  const handleFocus = useCallback(
    e => setTyping(isTextEntryElement(e.target)),
    [],
  );

  const handleBlur = useCallback(() => setTyping(false), []);

  // 正在輸入的元素被直接移除（換題、子頁按完成）時瀏覽器不會觸發 blur，
  // 所以每次 render 後確認焦點是否還在文字輸入框上，不在就恢復
  // （刻意不給 deps；有 isTyping 條件，不會無限迴圈）
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isTyping && !isTextEntryElement(document.activeElement)) {
      setTyping(false);
    }
  });

  return [isTyping, handleFocus, handleBlur];
};

export default useIsTyping;
