import React from 'react';
import { Link } from 'react-router';
import homeBanner from '../images/home-banner.png';
import styles from './HomeBanner.module.css';

const HomeBanner = () => (
  <section className={styles.home_banner}>
    <div className="wrapperL">
      <div className={styles.home_banner_img}>
        <img src={homeBanner} alt="home-banner" />
      </div>
      <div className={styles.home_banner_text}>
        <h1>工時薪資透明化運動</h1>
        <h3>分享你的真實工時、薪資資訊，讓我們一起改善工作資訊不透明的現況</h3>
        <Link to="/">了解更多﹥﹥</Link>
      </div>
    </div>
  </section>
);

export default HomeBanner;
