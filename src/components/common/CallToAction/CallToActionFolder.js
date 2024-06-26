import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heading } from 'common/base';
import ProgressBarWithDataCount from 'common/ProgressBarWithDataCount';
import { useShareLink } from 'hooks/experiments';
import FolderBanner from 'common/FolderBanner';
import styles from './CallToActionFolder.module.css';
import { goalNum } from 'constants/dataProgress';

const CallToActionFolder = () => {
  const shareLink = useShareLink();
  return (
    <FolderBanner rootClassName={styles.root}>
      <div className={styles.container}>
        <Heading size="m" className={styles.title} Tag="h2">
          「職場透明化運動」進行中
          <span className={styles.nowrap}> (๑•̀ㅂ•́)و✧</span>
        </Heading>
        <ProgressBarWithDataCount
          size="l"
          theme="gray"
          rootClassName={styles.progressbar}
        />
        <div className={styles['content-container']}>
          <span className={styles.content}>
            目標{' '}
            <strong className={styles['strong-text']}>{goalNum} 筆資料</strong>
            ，將你的薪水＆面試分享給更多人，一起建立台灣最大薪水、面試資料庫！
          </span>
        </div>
        <Link
          to={shareLink}
          className={cn('buttonCircleM', 'buttonBlack2', styles.button)}
        >
          GO!
        </Link>
      </div>
    </FolderBanner>
  );
};

export default CallToActionFolder;
