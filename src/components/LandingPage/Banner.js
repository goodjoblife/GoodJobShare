import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import styles from './Banner.module.css';
import { shareLink } from '../../constants/dataProgress';

const Banner = () => (
  <section className={styles.banner}>
    <Wrapper size="l">
      <div className={styles.image}>
        <img
          src="https://image.goodjob.life/yellow-banner.png"
          alt="求職市場透明化"
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>職場透明化運動</h1>
        <h2 className={styles.subheading}>
          匿名分享你的工時、薪資，讓我們求職不再面議！
        </h2>
        <Link to={shareLink} className={cn('buttonCircleM', 'buttonBlack2')}>
          GO!
        </Link>
      </div>
    </Wrapper>
  </section>
);

export default Banner;
