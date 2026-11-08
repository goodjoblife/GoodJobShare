import React from 'react';
import Helmet from 'react-helmet';

import { Wrapper } from 'common/base';
import SearchBar from 'common/SearchBar';
import heroImage from 'images/about-people-colored.webp';

import styles from './Banner.module.css';

const Banner = () => (
  <section className={styles.banner}>
    <Helmet>
      <link rel="preload" as="image" href={heroImage} fetchpriority="high" />
    </Helmet>
    <img
      src={heroImage}
      className={styles.heroImage}
      width="521"
      height="207"
      alt=""
      aria-hidden="true"
    />
    <Wrapper size="l">
      <div className={styles.content}>
        <h1 className={styles.heading}>職場透明化運動</h1>
        <h2 className={styles.subheading}>超過萬筆薪水、面試資料馬上查！</h2>
        <SearchBar />
      </div>
    </Wrapper>
  </section>
);

export default Banner;
