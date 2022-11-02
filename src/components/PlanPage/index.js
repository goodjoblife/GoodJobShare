import React from 'react';

import Heading from 'common/base/Heading';

import styles from './PlanPage.module.css';
import CardSection from './CardSection';
import { groupByPlanType } from './helpers';

const plans = [
  {
    skuId: 1,
    type: 'SubmitData',
    title: '留下一筆資料',
    description: '解鎖全站 7 天',
    amount: 0,
  },
  {
    skuId: 2,
    type: 'BuySubscription',
    title: '包月方案',
    description: '解鎖全站 1 個月',
    amount: 99,
  },
  {
    skuId: 3,
    type: 'BuySubscription',
    title: '包季方案',
    description: '解鎖全站 3 個月',
    amount: 149,
  },
];

const PlanPage = () => {
  const groupedPlans = groupByPlanType(plans);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} size="m">
          解鎖全站資料方式
        </Heading>
        <div className={styles['card-section']}>
          <CardSection
            plans={groupedPlans['SubmitData']}
            title="留下你的資料幫助其他人："
          />
          {groupedPlans['SubmitData'].length > 0 && (
            <div className={styles.divider}>或是</div>
          )}
          <CardSection
            plans={groupedPlans['BuySubscription']}
            title="線上付費解鎖全站資料："
          />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
