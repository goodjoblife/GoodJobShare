import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

import {
  SET_PAYMENT_RECORD,
  SET_SUBSCRIPTION_PLANS,
  SET_MY_CURRENT_SUBSCRIPTION,
} from 'actions/payment';

const preloadedState = {
  paymentRecord: getUnfetched(),
  subscriptionPlans: getUnfetched(),
  myCurrentSubscription: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
  [SET_SUBSCRIPTION_PLANS]: (state, { subscriptionPlans }) => ({
    ...state,
    subscriptionPlans,
  }),
  [SET_MY_CURRENT_SUBSCRIPTION]: (state, { currentSubscription }) => ({
    ...state,
    myCurrentSubscription: currentSubscription,
  }),
});
