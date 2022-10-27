import React from 'react';

import Heading from 'common/base/Heading';

import styles from './PlanPage.module.css';
import PlanCard from './PlanCard';
import { getColumns, getActionTitle } from './helpers';

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
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} size="m">
          解鎖全站資料方式
        </Heading>
        <div
          className={styles.cardSection}
          style={{
            gridTemplateColumns: `repeat(${getColumns(plans)}, 1fr)`,
          }}
        >
          {plans.map(plan => (
            <PlanCard
              key={plan.skuId}
              title={plan.title}
              description={plan.description}
              amount={plan.amount}
              actionTitle={getActionTitle(plan)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
