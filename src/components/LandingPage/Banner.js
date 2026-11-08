import React from 'react';
import Helmet from 'react-helmet';

import { Wrapper } from 'common/base';
import SearchBar from 'common/SearchBar';
import heroImage from 'images/about-people-colored.webp';

import styles from './Banner.module.css';

const Banner = () => (
  <section className={styles.banner}>
    {/* 背景圖是 LCP 元素，但要等 CSS 下載解析完才會被發現；
        在 <head> 預載，讓瀏覽器一開始就以高優先度下載。
        網址需與 Banner.module.css 的 url() 指向同一檔案，避免重複下載 */}
    <Helmet>
      <link rel="preload" as="image" href={heroImage} fetchpriority="high" />
    </Helmet>
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
