import { getError, getFetched, getUnfetched, toFetching } from 'utils/fetchBox';

import {
  paymentRecordSelector,
  redirectUrlSelector,
  plansSelector,
} from '../selectors/payment';

export const SET_REDIRECT_URL = '@@PAYMENT_PERSIST/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';
export const SET_PLANS = '@@PAYMENT/SET_PLANS';

const setRedirectUrl = redirectUrl => ({
  type: SET_REDIRECT_URL,
  redirectUrl,
});

const setPaymentRecord = paymentRecord => ({
  type: SET_PAYMENT_RECORD,
  paymentRecord,
});

const setPlans = plans => ({
  type: SET_PLANS,
  plans,
});

export const navigateToBuy = (redirectUrl, actionUrl) => (
  dispatch,
  getState,
  { history },
) => {
  history.push(actionUrl);
  dispatch(setRedirectUrl(redirectUrl));
};

export const navigateToRedirectUrl = () => (
  dispatch,
  getState,
  { history },
) => {
  const state = getState();
  const redirectUrl = redirectUrlSelector(state) || '/';

  history.push(redirectUrl);

  dispatch(setRedirectUrl(null));
  dispatch({
    type: SET_PAYMENT_RECORD,
    paymentRecord: getUnfetched(),
  });
};

export const fetchPaymentRecord = paymentRecordId => (
  dispatch,
  getState,
  { api },
) => {
  const state = getState();
  const paymentRecord = paymentRecordSelector(state);

  dispatch(setPaymentRecord(toFetching(paymentRecord)));

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: paymentRecordId,
        publicId: '221116-123456',
        // status: 'PendingAuthorization',
        status: 'Authorized',
        // status: 'Error',
        paymentMethodSnapshot: {},
        amount: 399,
        createdAt: new Date(),
        updated_at: new Date(),
      });
    }, 3000);
  })
    .then(paymentRecord => {
      dispatch(setPaymentRecord(getFetched(paymentRecord)));
    })
    .catch(error => {
      console.error(error);
      dispatch(getError(error));
    });
};

export const fetchPlans = () => (dispatch, getState, { api }) => {
  const state = getState();
  const plans = plansSelector(state);

  dispatch(setPlans(toFetching(plans)));

  return api.payment
    .getPlans()
    .then(plans => {
      dispatch(setPlans(getFetched(plans)));
    })
    .catch(error => {
      console.error(error);
      dispatch(setPlans(getError(plans)));
    });
};
