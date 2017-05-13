import React from 'react';

// import Button from 'common/button/Button';
// import Checkbox from 'common/form/Checkbox';
import RecommendationBlock from './RecommendationBlock';

import styles from './RecommendationZone.module.css';

const RecommendationZone = () => (
  <div className={styles.container}>
    <div className="subheadingL">您可能還想看...</div>
    <br />
    <div className={styles.recommendationZone}>
      <RecommendationBlock />
      <RecommendationBlock />
      <RecommendationBlock />
    </div>
  </div>
);

export default RecommendationZone;
