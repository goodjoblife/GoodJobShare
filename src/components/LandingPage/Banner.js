import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import { Wrapper } from 'common/base';
import styles from './Banner.module.css';

const Banner = () => (
  <section className={styles.banner}>
    <Wrapper size="l">
      <div className={styles.image}>
        <img src="https://image.goodjob.life/yellow-banner.png" alt="求職市場透明化" />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>好工作評論網</h1>
        <h2 className={styles.subheading}>
          你是否曾覺得職場資訊不夠透明？分享你的職場或面試經驗，讓我們一起改變現狀、定義理想的工作！
          <Link to="/about" className="blueLink">了解更多</Link>
        </h2>
        <Link to="/share" className={cn('buttonCircleL', 'buttonBlack2')}>立即參與</Link>
      </div>
    </Wrapper>
  </section>
);

export default Banner;
