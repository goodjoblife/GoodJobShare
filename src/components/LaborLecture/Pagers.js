import React from 'react';
import styles from './Pagers.module.css';

const Pagers = () => (
  <div className={styles.pagers}>
    <div className={`${styles.pager} ${styles.left}`}>
      <div className={`pLBold ${styles.text}`}>
        {'\u003C '}前一課
      </div>
      <div className={styles.image} />
    </div>
    <div className={`${styles.pager} ${styles.right}`}>
      <div className={`pLBold ${styles.text}`}>
        下一課{' \u003E'}
      </div>
      <div className={styles.image} />
    </div>
  </div>
);

export default Pagers;
