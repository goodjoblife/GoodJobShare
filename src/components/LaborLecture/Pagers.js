import React from 'react';
import styles from './Pagers.module.css';

const Pagers = () => (
  <div className={styles.pagers}>
    <div style={{ float: 'left', textAlign: 'left' }}>
      <div className={`pLBold ${styles.text}`}>
        {'\u003C '}前一課
      </div>
      <div className={styles.image} />
    </div>
    <div style={{ float: 'right', textAlign: 'right' }}>
      <div className={`pLBold ${styles.text}`}>
        下一課{' \u003E'}
      </div>
      <div className={styles.image} />
    </div>
    <div style={{ clear: 'both' }} />
  </div>
);

export default Pagers;
