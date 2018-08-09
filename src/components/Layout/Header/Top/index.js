import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import styles from './Top.module.css';
import ProgressBarWithExperienceCount from '../../../../containers/ProgressBar';
import { shareLink } from '../../../../constants/dataProgress';

const Top = () => (
  <Link to={shareLink} className={styles.root}>
    <Wrapper size="l" className={styles.inner}>
      <div className={styles.heading}>\ 「職場透明化運動」進行中 /</div>
      <ProgressBarWithExperienceCount size="s" theme="black" />
      <div className={styles.subheading}>
        將你的薪資、工時分享給更多人知道，讓我們求職不再面議！
      </div>
      <div className={styles.button}>GO !</div>
    </Wrapper>
  </Link>
);

export default Top;
