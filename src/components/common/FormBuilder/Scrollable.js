import React from 'react';
import cn from 'classnames';

import styles from './Scrollable.module.css';

const Scrollable = ({ children, className }) => (
  <div className={cn(styles.frame, className)}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default Scrollable;
