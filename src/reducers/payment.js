import createReducer from 'utils/createReducer';

import { SET_REDIRECT_URL, SET_PAYMENT_RECORD } from '../actions/payment';

const preloadedState = {
  redirectUrl: null,
  paymentRecord: null,
};

export default createReducer(preloadedState, {
  [SET_REDIRECT_URL]: (state, { url }) => ({
    ...state,
    redirectUrl: url,
  }),
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
});
