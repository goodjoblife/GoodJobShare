import cn from 'classnames';
import React from 'react';

import styles from './NavigatorBlock.module.css';

export type NavigatorButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
};

export const NavigatorButton = ({
  className,
  ...restProps
}: NavigatorButtonProps): React.ReactElement => (
  <button {...restProps} className={cn(className, styles.btn)} />
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
