import React from 'react';
import cn from 'classnames';

import styles from './PaymentSection.module.css';

const Row = ({ className, half, ...props }) => (
  <div
    className={cn(styles.row, half ? styles.half : styles.full, className)}
    {...props}
  />
);

export default Row;
