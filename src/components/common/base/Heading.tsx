import cn from 'classnames';
import React from 'react';

import styles from './Heading.module.css';

type HeadingSize = 'l' | 'm' | 'sl' | 'sm';

type Props = {
  Tag?: React.ElementType;
  size?: HeadingSize;
  bold?: boolean;
  light?: boolean;
  center?: boolean;
  marginBottom?: boolean;
  marginBottomS?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Heading: React.FC<Props> = ({
  Tag = 'h1',
  size = 'm',
  bold = false,
  light,
  center,
  marginBottom = false,
  marginBottomS = false,
  children,
  style,
  className,
}) => (
  <Tag
    className={cn(styles[size], className, {
      [styles.bold]: bold,
      [styles.light]: light,
      [styles.center]: center,
      [styles.marginBottom]: marginBottom,
      [styles.marginBottomS]: marginBottomS,
    })}
    style={style}
  >
    {children}
  </Tag>
);

export default Heading;
