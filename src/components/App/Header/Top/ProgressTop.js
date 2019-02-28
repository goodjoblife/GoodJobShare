import React from 'react';
import ProgressBarWithDataCount from '../../../../containers/ProgressBar';

import styles from './ProgressTop.module.css';

const ProgressTop = () => (
  <React.Fragment>
    <div className={styles.heading}>\ 「職場透明化運動」進行中 /</div>
    <ProgressBarWithDataCount size="s" theme="black" />
    <div className={styles.subheading}>
      匿名分享你的面試經驗，一起建立台灣最大面試資料庫！
    </div>
    <div className={styles.button}>GO !</div>
  </React.Fragment>
);

export default ProgressTop;
