import React from 'react';

import Heading from 'common/base/Heading';
import { subscriptionType } from 'constants/subscription';
import { setStatic } from 'recompose';
import { fetchPlans } from '../../actions/payment';

import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([dispatch(fetchPlans())]);
});

const plans = [
  {
    skuId: 'submit-data',
    type: 'SubmitData',
    title: '留下一筆資料',
    description: '解鎖全站 7 天',
    amount: 0,
  },
  {
    skuId: '1-months-subscription',
    type: 'BuySubscription',
    title: '包月方案',
    description: '解鎖全站 1 個月',
    amount: 99,
  },
  {
    skuId: '3-months-subscription',
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

export default ssr(PlanPage);
