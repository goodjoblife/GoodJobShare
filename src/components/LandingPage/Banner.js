import React from 'react';
import { Wrapper } from 'common/base';
import styles from './Banner.module.css';
import SearchBar from './SearchBar';

const Banner = () => (
  <section className={styles.banner}>
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
