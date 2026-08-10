import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSubscriptionPlans } from 'actions/payment';
import { subscriptionType } from 'constants/subscription';
import { useSubscriptionPlans } from 'hooks/payment/usePayment';
import { isFetched } from 'utils/fetchBox';

const useUnlockedDescriptionBySubmission = () => {
  const dispatch = useDispatch();
  const subscriptionPlansBox = useSubscriptionPlans();
  const isReady = isFetched(subscriptionPlansBox);

  useEffect(() => {
    if (!isReady) {
      dispatch(fetchSubscriptionPlans());
    }
  }, [dispatch, isReady]);

  if (!isReady) {
    return '';
  }

  const plans = subscriptionPlansBox.data;
  const plan = plans.find(plan => plan.type === subscriptionType.submitData);
  if (!plan) {
    return '解鎖全站 7 天';
  }
  return plan.description;
};

export default useUnlockedDescriptionBySubmission;
