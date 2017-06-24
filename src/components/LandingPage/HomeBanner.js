import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { Wrapper, Heading } from 'common/base';
import styles from './HomeBanner.module.css';

const HomeBanner = () => (
  <section className={styles.banner}>
    <Wrapper size="l">
      <div className={styles.image}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/banner03.png" alt="求職市場透明化" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>求職市場透明化</h1>
        <Heading size="sm" light className={styles.subheading}>
          分享你的真實工時、薪資資訊，讓我們一起改善工作資訊不透明的現況
        </Heading>
        <Link to="/share" className={cn('buttonCircleM', 'buttonWhiteLine')}>立即參與</Link>
      </div>
    </Wrapper>
  </section>
);

export default HomeBanner;
