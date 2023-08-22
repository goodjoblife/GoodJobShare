import React, { useEffect } from 'react';
import SubscriptionWrapper from './SubscriptionWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMySubscriptions } from 'actions/payment';
import { mySubscriptionsSelector } from 'selectors/payment';
import { isFetched, isFetching } from 'utils/fetchBox';
import Loader from 'common/Loader';

const Subscriptions = () => {
  const subscriptionsBox = useSelector(mySubscriptionsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMySubscriptions());
  }, [dispatch]);

  if (isFetching(subscriptionsBox)) return <Loader />;

  if (!isFetched(subscriptionsBox)) return null;

  const { data } = subscriptionsBox;

  return <div>{JSON.stringify(data)}</div>;
};

export default () => (
  <SubscriptionWrapper>
    <Subscriptions />
  </SubscriptionWrapper>
);
