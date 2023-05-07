import { getError, getFetched, getUnfetched, toFetching } from 'utils/fetchBox';
import { createToastLocationState } from 'utils/toastNotification';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import {
  paymentRecordSelector,
  redirectUrlSelector,
  subscriptionPlansSelector,
} from '../selectors/payment';

import { tokenSelector } from '../selectors/authSelector';

export const SET_REDIRECT_URL = '@@PAYMENT_PERSIST/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';
export const SET_SUBSCRIPTION_PLANS = '@@PAYMENT/SET_PLANS';

const setRedirectUrl = redirectUrl => ({
  type: SET_REDIRECT_URL,
  redirectUrl,
});

const setPaymentRecord = paymentRecord => ({
  type: SET_PAYMENT_RECORD,
  paymentRecord,
});

const setSubscriptionPlans = subscriptionPlans => ({
  type: SET_SUBSCRIPTION_PLANS,
  subscriptionPlans,
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

  history.push(
    redirectUrl,
    createToastLocationState(NOTIFICATION_TYPE.INFO, '成功解鎖'),
  );

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
  const token = tokenSelector(state);

  dispatch(setPaymentRecord(toFetching(paymentRecord)));

  const fetcher = api.payment.getPaymentRecord(token);

  return fetcher(paymentRecordId)
    .then(paymentRecord => {
      dispatch(setPaymentRecord(getFetched(paymentRecord)));
    })
    .catch(error => {
      console.error(error);
      dispatch(setPaymentRecord(getError(error)));
      if (window && window.Raven) {
        window.Raven.captureException(error);
      }
    });
};

export const fetchSubscriptionPlans = () => (dispatch, getState, { api }) => {
  const state = getState();
  const plans = subscriptionPlansSelector(state);

  dispatch(setSubscriptionPlans(toFetching(plans)));

  return api.payment
    .getSubscriptionPlans()
    .then(plans => {
      dispatch(setSubscriptionPlans(getFetched(plans)));
    })
    .catch(error => {
      console.error(error);
      dispatch(setSubscriptionPlans(getError(plans)));
      if (window && window.Raven) {
        window.Raven.captureException(error);
      }
    });
};
