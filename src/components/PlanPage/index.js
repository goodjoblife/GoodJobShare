import React, { useEffect } from 'react';
import { setStatic } from 'recompose';
import { useDispatch } from 'react-redux';

import Heading from 'common/base/Heading';
import { useSubscriptionPlans } from 'hooks/payment/usePayment';
import { isFetched } from 'utils/fetchBox';
import Loading from 'common/Loader';

import { fetchSubscriptionPlans } from '../../actions/payment';
import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const ssr = setStatic('fetchData', ({ store: { dispatch } }) => {
  return dispatch(fetchSubscriptionPlans());
});

const PlanPage = () => {
  const dispatch = useDispatch();
  const subscriptionPlansBox = useSubscriptionPlans();

  const isReady = isFetched(subscriptionPlansBox);

  useEffect(() => {
    if (!isReady) {
      dispatch(fetchSubscriptionPlans());
    }
  }, [dispatch, isReady]);

  if (!isReady) {
    return <Loading size="l" />;
  }

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
