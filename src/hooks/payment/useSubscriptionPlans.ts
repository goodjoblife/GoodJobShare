import { useSelector } from 'react-redux';

import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { subscriptionPlansSelector } from 'selectors/payment';
import FetchBox from 'utils/fetchBox';

export const useSubscriptionPlans = (): FetchBox<SubscriptionPlan[]> =>
  useSelector(subscriptionPlansSelector);
