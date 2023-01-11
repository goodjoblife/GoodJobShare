import React, { useEffect } from 'react';
import { setStatic } from 'recompose';
import { useDispatch } from 'react-redux';

import Heading from 'common/base/Heading';
import { useSubscriptionPlans } from 'hooks/payment/usePayment';

import { fetchSubscriptionPlans } from '../../actions/payment';
import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([dispatch(fetchSubscriptionPlans())]);
});

// Promise.resolve([
//   {
//     skuId: 'submit-data',
//     type: 'SubmitData',
//     title: '留下一筆資料',
//     description: '解鎖全站 7 天',
//     amount: 0,
//   },
//   {
//     skuId: '1-months-subscription',
//     type: 'BuySubscription',
//     title: '包月方案',
//     description: '解鎖全站 1 個月',
//     amount: 99,
//   },
//   {
//     skuId: '3-months-subscription',
//     type: 'BuySubscription',
//     title: '包季方案',
//     description: '解鎖全站 3 個月',
//     amount: 149,
//   },
// ]);

const PlanPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptionPlans());
  }, [dispatch]);

  const subscriptionPlansBox = useSubscriptionPlans();

  const plans = subscriptionPlansBox.data;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading className={styles.title} size="l">
          解鎖全站資料方式
        </Heading>
        <div className={styles['cardSection']}>
          <CardSection plans={plans} />
        </div>
      </div>
    </div>
  );
};

export default ssr(PlanPage);
