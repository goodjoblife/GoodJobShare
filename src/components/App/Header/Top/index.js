import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import styles from './Top.module.css';
import ProgressBarWithDataCount from '../../../../containers/ProgressBar';
import { shareLink } from '../../../../constants/dataProgress';

const Top = () => (
  <Link to={shareLink} className={styles.root}>
    <Wrapper size="l" className={styles.inner}>
      <div className={styles.heading}>\ 「職場透明化運動」進行中 /</div>
      <ProgressBarWithDataCount size="s" theme="black" />
      <div className={styles.subheading}>
        匿名分享你的面試經驗，一起建立台灣最大面試資料庫！
      </div>
      <div className={styles.button}>GO !</div>
    </Wrapper>
  </Link>
);

export default Top;
