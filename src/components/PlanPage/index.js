import React from 'react';

import Heading from 'common/base/Heading';

import styles from './PlanPage.module.css';
import PlanCard from './PlanCard';

const PlanPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} size="m">
          解鎖全站資料方式
        </Heading>
        <div className={styles.cardSection}>
          <PlanCard title="留下一筆資料" actionTitle="留下資料" />
          <PlanCard title="包月方案" actionTitle="付費解鎖" />
          <PlanCard title="包季方案" actionTitle="付費解鎖" />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
