import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { Wrapper, P } from 'common/base';
import styles from './Banner.module.css';

const Banner = () => (
  <section className={styles.banner}>
    <Wrapper size="l">
      <div className={styles.image}>
        <img src="https://s3-ap-northeast-1.amazonaws.com/goodjob.life/www/yellow-banner.png" alt="求職市場透明化" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>求職市場透明化</h1>
        <P size="l" Tag="h2" className={styles.subheading}>
          分享你的真實工時、薪資資訊，讓我們一起改善工作資訊不透明的現況。
          <Link to="/about" className="blueLink">了解更多 ‣</Link>
        </P>
        <Link to="/share" className={cn('buttonCircleM', 'buttonBlackLine')}>立即參與</Link>
      </div>
    </Wrapper>
  </section>
);

export default Banner;
