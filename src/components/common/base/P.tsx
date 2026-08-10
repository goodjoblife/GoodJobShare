import cn from 'classnames';
import React from 'react';

import styles from './P.module.css';

type PSize = 'xl' | 'l' | 'm' | 's';

type Props = {
  Tag?: React.ElementType;
  size?: PSize;
  bold?: boolean;
  center?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
  [key: string]: unknown;
};

const P: React.FC<Props> = ({
  Tag = 'div',
  size = 'm',
  bold = false,
  center,
  children,
  style,
  className,
  title,
  ...props
}) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.center]: center,
    })}
    style={style}
    title={title}
    {...props}
  >
    {children}
  </Tag>
);

export default P;
