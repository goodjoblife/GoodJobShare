import cn from 'classnames';
import React from 'react';

import styles from './NavigatorBlock.module.css';

export type NavigatorButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
};

export const NavigatorButton = ({
  className,
  onMouseDown,
  ...restProps
}: NavigatorButtonProps): React.ReactElement => (
  <button
    {...restProps}
    onMouseDown={(e): void => {
      // 按下時不讓輸入框失焦：失焦會讓 FormBuilder 輸入時隱藏的 header／footer 立刻出現、
      // 手機鍵盤也同時收起，版面在點擊途中變動，手指放開時已不在按鈕上，造成要點兩次
      e.preventDefault();
      // 外部傳入的 onMouseDown 也要呼叫，避免被上面的處理默默覆蓋
      if (onMouseDown) onMouseDown(e);
    }}
    className={cn(className, styles.btn)}
  />
);

type NavigatorBlockProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  skippable: boolean;
};

const NavigatorBlock = ({
  skippable,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: NavigatorBlockProps): React.ReactElement => (
  <div className={styles.container}>
    <NavigatorButton onClick={onPrevious} disabled={!hasPrevious}>
      上一題
    </NavigatorButton>
    <NavigatorButton onClick={onNext} disabled={!hasNext}>
      {skippable ? '跳過' : '下一題'}
    </NavigatorButton>
  </div>
);

export default NavigatorBlock;
