import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { Wrapper } from 'common/base';
import RaiseExperiencesProgressBar from 'common/RaiseExperiencesProgressBar';
import getCallToActionLink from 'utils/callToActionUtils';
import styles from './Banner.module.css';

const Banner = () => (
  <section className={styles.banner}>
    <Wrapper size="l">
      <div className={styles.image}>
        <img src="https://image.goodjob.life/yellow-banner.png" alt="求職市場透明化" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}><span>好工作評論網募「資」中 </span>(๑•̀ㅂ•́)و✧</h1>
        <RaiseExperiencesProgressBar rootClassName={styles.progressBar} />
        <h2 className={styles.subheading}>
          目標 <strong>500</strong> 筆資料，不需要花上辛苦錢，只需要動動你的手，<br />
          將你的面試、工作經驗分享給更多人知道。
        </h2>
        <Link to={getCallToActionLink()} className={cn('buttonCircleM', 'buttonBlack2')}>GO!</Link>
      </div>
    </Wrapper>
  </section>
);

export default Banner;
