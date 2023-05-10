import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchMyCurrentSubscription } from 'actions/payment';
import { isUnfetched, isFetched } from 'utils/fetchBox';
import { useMyCurrentSubscription } from 'hooks/payment/usePayment';
import Loading from 'common/Loader';

import PlansWrapper from './PlansWrapper';
import EmptySubscription from './EmptySubscription';
import CurrentSubscription from './CurrentSubscription';

const CurrentPlanPage = () => {
  const dispatch = useDispatch();
  const myCurrentSubscriptionBox = useMyCurrentSubscription();

  const needsFetching = isUnfetched(myCurrentSubscriptionBox);
  const isReady = isFetched(myCurrentSubscriptionBox);

  useEffect(() => {
    if (needsFetching) {
      dispatch(fetchMyCurrentSubscription());
    }
  }, [dispatch, needsFetching]);

  if (!isReady) {
    return (
      <PlansWrapper>
        <Loading size="l" />;
      </PlansWrapper>
    );
  }

  const emptySubscription = false;

  if (emptySubscription) {
    return (
      <PlansWrapper>
        <EmptySubscription />
      </PlansWrapper>
    );
  }

  const subscription = myCurrentSubscriptionBox.data;
  console.log({ subscription });
  console.log({ subscriptionPlan: subscription.subscriptionPlan });

  return (
    <PlansWrapper>
      <CurrentSubscription subscriptionPlan={subscription.subscriptionPlan} />
    </PlansWrapper>
  );
};

export default CurrentPlanPage;
