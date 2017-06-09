import React from 'react';
import Helmet from 'react-helmet';
import ShareExpSection from 'common/ShareExpSection';
import HomeBanner from './HomeBanner';
import styles from './LandingPage.module.css';

const LandingPage = () => (
  <main className={styles.site_main}>
    <Helmet
      title="首頁"
    />
    <HomeBanner />
    <ShareExpSection heading="現在就留下你的資料吧！" />
  </main>
);

export default LandingPage;
