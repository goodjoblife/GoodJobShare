import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

import { SET_REDIRECT_URL, SET_PAYMENT_RECORD } from '../actions/payment';

const preloadedState = {
  redirectUrl: null,
  paymentRecord: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_REDIRECT_URL]: (state, { redirectUrl }) => ({
    ...state,
    redirectUrl,
  }),
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
});
