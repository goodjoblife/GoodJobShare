import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading } from 'common/base';
import FolderBanner from '../FolderBanner';
import ProgressBarWithExperienceCount from '../../../containers/ProgressBar';
import styles from './CallToActionFolder.module.css';
import { goalNum, shareLink } from '../../../constants/dataProgress';


const CallToActionFolder = () => (
  <FolderBanner rootClassName={styles.root}>
    <div className={styles.container}>
      <Heading size="m" className={styles.title} Tag="h2">「職場透明化運動」進行中
        <span className={styles.nowrap}> (๑•̀ㅂ•́)و✧</span>
      </Heading>
      <ProgressBarWithExperienceCount size="l" theme="gray" rootClassName={styles.progressbar} />
      <div className={styles['content-container']}>
        <span className={styles.content}>目標 <strong className={styles['strong-text']}>{goalNum} 筆資料</strong>
        ，將你的薪資、工時分享給更多人知道，讓我們求職不再面議！</span>
      </div>
      <Link to={shareLink} className={cn('buttonCircleM', 'buttonBlack2', styles.button)}>GO!</Link>
    </div>
  </FolderBanner>
);

export default CallToActionFolder;
