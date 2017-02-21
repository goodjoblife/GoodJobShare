import React from 'react';
import Helmet from 'react-helmet';

import HomeBanner from './HomeBanner';
import Classrooms from './Classrooms';
import ShareExperienceWrapper from './ShareExperienceWrapper';
import styles from './LandingPage.module.css';


const LandingPage = () => (
  <main className={styles.site_main}>
    <Helmet
      title="首頁"
    />
    <HomeBanner />
    <Classrooms />
    <ShareExperienceWrapper />
  </main>
);


export default LandingPage;
