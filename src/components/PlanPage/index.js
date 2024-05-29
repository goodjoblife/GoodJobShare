import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import Heading from 'common/base/Heading';
import { useSubscriptionPlans } from 'hooks/payment/usePayment';
import { isUnfetched, isFetched } from 'utils/fetchBox';
import Loading from 'common/Loader';
import { subscriptionType } from 'constants/subscription';

import { fetchSubscriptionPlans } from 'actions/payment';
import styles from './PlanPage.module.css';
import CardSection from './CardSection';

const PlanPage = () => {
  const dispatch = useDispatch();
  const subscriptionPlansBox = useSubscriptionPlans();

  const needsFetching = isUnfetched(subscriptionPlansBox);
  const isReady = isFetched(subscriptionPlansBox);

  useEffect(() => {
    if (needsFetching) {
      dispatch(fetchSubscriptionPlans());
    }
  }, [dispatch, needsFetching]);

  if (!isReady) {
    return <Loading size="l" />;
  }

  let plans = subscriptionPlansBox.data;
  if (Array.isArray(plans)) {
    const planTypes = R.values(subscriptionType);
    plans = plans.filter(plan => planTypes.includes(plan.type));
  }

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

PlanPage.fetchData = ({ store: { dispatch } }) => {
  return dispatch(fetchSubscriptionPlans());
};

export default PlanPage;
