import { AnyAction } from 'redux';

import getSubscriptionPlansApi, {
  SubscriptionPlan,
} from 'apis/getSubscriptionPlans';
import { Thunk } from 'reducers';
import { subscriptionPlansSelector } from 'selectors/payment';
import FetchBox, {
  getError,
  getFetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';

export const SET_SUBSCRIPTION_PLANS = '@@PAYMENT/SET_PLANS';

const setSubscriptionPlans = (
  subscriptionPlans: FetchBox<SubscriptionPlan[]>,
): AnyAction => ({
  type: SET_SUBSCRIPTION_PLANS,
  subscriptionPlans,
});

export const fetchSubscriptionPlans = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const plansBox = subscriptionPlansSelector(getState());

  if (isFetching(plansBox)) {
    return;
  }

  dispatch(setSubscriptionPlans(toFetching(plansBox)));

  try {
    const plans = await getSubscriptionPlansApi();
    return dispatch(setSubscriptionPlans(getFetched(plans)));
  } catch (error) {
    console.error(error);
    dispatch(setSubscriptionPlans(getError(error)));
  }
};
