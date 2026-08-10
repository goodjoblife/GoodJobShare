import { isNil } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchMyCurrentSubscription } from 'actions/payment';
import Loading from 'common/Loader';
import { useMyCurrentSubscription } from 'hooks/payment/usePayment';
import { isFetched, isUnfetched } from 'utils/fetchBox';

import CurrentSubscription from './CurrentSubscription';
import EmptySubscription from './EmptySubscription';
import SubscriptionWrapper from './SubscriptionWrapper';

const withSubscriptionWrapper = Component => props => (
  <SubscriptionWrapper>
    <Component {...props} />
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
    return <Loading size="l" />;
  }

  if (isNil(myCurrentSubscriptionBox)) {
    return <EmptySubscription />;
  }

  const subscription = myCurrentSubscriptionBox.data;

  if (isNil(subscription)) {
    return <EmptySubscription />;
  }

  if (subscription.status !== 'OK') {
    return <EmptySubscription />;
  }

  return (
    <CurrentSubscription
      subscriptionPlan={subscription.subscriptionPlan}
      expiredAt={subscription.expiredAt}
    />
  );
};

export default withSubscriptionWrapper(CurrentSubscriptionPage);
