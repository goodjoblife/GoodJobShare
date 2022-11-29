import createReducer from 'utils/createReducer';

import { SET_FROM_URL, SET_PAYMENT_RECORD } from '../actions/payment';

const preloadedState = {
  fromUrl: null,
  paymentRecord: null,
};

export default createReducer(preloadedState, {
  [SET_FROM_URL]: (state, { url }) => ({
    ...state,
    fromUrl: url,
  }),
  [SET_PAYMENT_RECORD]: (state, { paymentRecord }) => ({
    ...state,
    paymentRecord,
  }),
});
