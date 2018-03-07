import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading } from 'common/base';
import getCallToActionLink from 'utils/callToActionUtils';
import FolderBanner from '../FolderBanner';
import ProgressBarWithExperienceCount from '../../../containers/ProgressBar';
import styles from './CallToActionFolder.module.css';

const CallToActionFolder = () => (
  <FolderBanner rootClassName={styles.root}>
    <div className={styles.container}>
      <Heading size="m" className={styles.title} Tag="h2">好工作評論網募「資」中
        <span className={styles.nowrap}> (๑•̀ㅂ•́)و✧</span>
      </Heading>
      <ProgressBarWithExperienceCount size="l" theme="gray" rootClassName={styles.progressbar} />
      <div className={styles['content-container']}>
        <span className={styles.content}>目標 <strong className={styles['strong-text']}>500 筆資料</strong>
        ，不需要花上辛苦錢，只需要動動你的手，<br />將你的面試、工作經驗分享給更多人知道。</span>
      </div>
      <Link to={getCallToActionLink()} className={cn('buttonCircleM', 'buttonBlack2', styles.button)}>GO!</Link>
    </div>
  </FolderBanner>
);

export default CallToActionFolder;
