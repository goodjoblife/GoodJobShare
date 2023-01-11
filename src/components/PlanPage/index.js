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
