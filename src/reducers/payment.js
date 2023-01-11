import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

import { SET_PAYMENT_RECORD, SET_PLANS } from '../actions/payment';

const preloadedState = {
  paymentRecord: getUnfetched(),
  plans: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
  [SET_PLANS]: (state, { plans }) => ({
    ...state,
    plans,
  }),
});
