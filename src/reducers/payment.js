import {
  SET_MY_CURRENT_SUBSCRIPTION,
  SET_PAYMENT_RECORD,
  SET_SUBSCRIPTION_PLANS,
} from 'actions/payment';
import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

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
