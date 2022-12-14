import React from 'react';

import Heading from 'common/base/Heading';
import { subscriptionType } from 'constants/subscription';

import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const plans = [
  {
    skuId: 1,
    type: 'SubmitData',
    title: '留下一筆資料',
    description: '解鎖全站 7 天',
    amount: 0,
    url: '/',
  },
  {
    skuId: 2,
    type: 'BuySubscription',
    title: '包月方案',
    description: '解鎖全站 1 個月',
    amount: 99,
    url: '/',
  },
  {
    skuId: 3,
    type: 'BuySubscription',
    title: '包季方案',
    description: '解鎖全站 3 個月',
    amount: 149,
    url: '/',
  },
];

const PlanPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} size="l">
          解鎖全站資料方式
        </Heading>
        <div className={styles['cardSection']}>
          <CardSection
            plans={plans}
            title="留下你的資料幫助其他人："
            type={subscriptionType.submitData}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
