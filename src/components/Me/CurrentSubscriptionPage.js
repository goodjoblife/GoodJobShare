import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isNil } from 'ramda';

import { fetchMyCurrentSubscription } from 'actions/payment';
import { isUnfetched, isFetched } from 'utils/fetchBox';
import { useMyCurrentSubscription } from 'hooks/payment/usePayment';
import Loading from 'common/Loader';

import SubscriptionWrapper from './SubscriptionWrapper';
import EmptySubscription from './EmptySubscription';
import CurrentSubscription from './CurrentSubscription';

const EmptyContent = () => (
  <SubscriptionWrapper>
    <EmptySubscription />
  </SubscriptionWrapper>
);

const CurrentSubscriptionPage = () => {
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
      <SubscriptionWrapper>
        <Loading size="l" />;
      </SubscriptionWrapper>
    );
  }

  if (isNil(myCurrentSubscriptionBox)) {
    return <EmptyContent />;
  }

  const subscription = myCurrentSubscriptionBox.data;

  if (isNil(subscription)) {
    return <EmptyContent />;
  }

  if (subscription.status !== 'OK') {
    return <EmptyContent />;
  }

  return (
    <SubscriptionWrapper>
      <CurrentSubscription
        subscriptionPlan={subscription.subscriptionPlan}
        expiredAt={subscription.expiredAt}
      />
    </SubscriptionWrapper>
  );
};

export default CurrentSubscriptionPage;
