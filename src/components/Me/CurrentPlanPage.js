import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchMyCurrentSubscription } from 'actions/payment';
import { isUnfetched, isFetched } from 'utils/fetchBox';
import { useMyCurrentSubscription } from 'hooks/payment/usePayment';
import Loading from 'common/Loader';

import PlansWrapper from './PlansWrapper';
import AuthMask from './AuthMask';
import EmptyCurrentPlan from './EmptyCurrentPlan';

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
      <AuthMask>
        <PlansWrapper>
          <Loading size="l" />;
        </PlansWrapper>
      </AuthMask>
    );
  }

  return (
    <AuthMask>
      <PlansWrapper>
        <EmptyCurrentPlan />
      </PlansWrapper>
    </AuthMask>
  );
};

export default CurrentPlanPage;
