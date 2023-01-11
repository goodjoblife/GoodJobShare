import React, { useEffect } from 'react';
import { setStatic } from 'recompose';
import { useDispatch } from 'react-redux';

import Heading from 'common/base/Heading';
import { subscriptionType } from 'constants/subscription';
import { usePlans } from 'hooks/payment/usePayment';

import { fetchPlans } from '../../actions/payment';
import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return Promise.all([dispatch(fetchPlans())]);
});

const PlanPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const plansBox = usePlans();

  const plans = plansBox.data;

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
