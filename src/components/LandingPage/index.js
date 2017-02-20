import React from 'react';
import Helmet from 'react-helmet';

import HomeBanner from './HomeBanner';
import Classroom from './Classroom';
import styles from './LandingPage.module.css';


const LandingPage = () => (
  <main className={styles.site_main}>
    <Helmet
      title="首頁"
    />
    <HomeBanner />
    <Classroom />
  </main>
);


export default LandingPage;
