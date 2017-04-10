import React from 'react';
import styles from './Lecture.module.css';

const Pagers = () => (
  <div className={styles.pagers}>
    <div style={{ float: 'left', textAlign: 'left' }}>
      <div className={`pLBold ${styles.pager_text}`}>
        {'\u003C '}前一課
      </div>
      <div className={styles.pager_image} />
    </div>
    <div style={{ float: 'right', textAlign: 'right' }}>
      <div className={`pLBold ${styles.pager_text}`}>
        下一課{' \u003E'}
      </div>
      <div className={styles.pager_image} />
    </div>
    <div style={{ clear: 'both' }} />
  </div>
);

export default Pagers;
