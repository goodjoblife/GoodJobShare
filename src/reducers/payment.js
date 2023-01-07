import createReducer from 'utils/createReducer';
import { getUnfetched } from 'utils/fetchBox';

import { SET_PAYMENT_RECORD } from '../actions/payment';

const preloadedState = {
  paymentRecord: getUnfetched(),
};

export default createReducer(preloadedState, {
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
});
