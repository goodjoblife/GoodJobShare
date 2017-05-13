import React from 'react';
import cn from 'classnames';
import styles from './NotFound.module.css';

const NotFound = () => (
  <div className={cn(styles.wrapper, 'wrapperL')}>
    <div className={styles.inner}>
      <h1 className={cn('subheadingL', styles.heading)}>不好意思，頁面不存在</h1>
      <a href="/" className={styles.link}>回首頁</a>
    </div>
  </div>
);

export default NotFound;
