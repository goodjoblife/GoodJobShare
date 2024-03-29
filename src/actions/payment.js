import {
  getError,
  getFetched,
  getUnfetched,
  toFetching,
  isFetching,
} from 'utils/fetchBox';
import { createToastLocationState } from 'utils/toastNotification';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';

import {
  paymentRecordSelector,
  redirectUrlSelector,
  subscriptionPlansSelector,
  myCurrentSubscriptionSelector,
} from 'selectors/payment';

import { tokenSelector } from 'selectors/authSelector';
import {
  getPaymentRecord as getPaymentRecordApi,
  getSubscriptionPlans as getSubscriptionPlansApi,
  queryMyCurrentSubscriptionApi,
} from 'apis/payment';

export const SET_REDIRECT_URL = '@@PAYMENT_PERSIST/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';
export const SET_SUBSCRIPTION_PLANS = '@@PAYMENT/SET_PLANS';
export const SET_MY_CURRENT_SUBSCRIPTION =
  '@@PAYMENT/SET_MY_CURRENT_SUBSCRIPTION';

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

const setMyCurrentSubscription = currentSubscription => ({
  type: SET_MY_CURRENT_SUBSCRIPTION,
  currentSubscription,
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

export const fetchPaymentRecord = paymentRecordId => (dispatch, getState) => {
  const state = getState();
  const paymentRecord = paymentRecordSelector(state);
  const token = tokenSelector(state);

  dispatch(setPaymentRecord(toFetching(paymentRecord)));

  const fetcher = getPaymentRecordApi(token);

  return fetcher(paymentRecordId)
    .then(paymentRecord => {
      dispatch(setPaymentRecord(getFetched(paymentRecord)));
    })
    .catch(error => {
      console.error(error);
      dispatch(setPaymentRecord(getError(error)));
    });
};

export const fetchSubscriptionPlans = () => async (dispatch, getState) => {
  const state = getState();
  const plansBox = subscriptionPlansSelector(state);

  if (isFetching(plansBox)) {
    return;
  }

  dispatch(setSubscriptionPlans(toFetching(plansBox)));

  try {
    const plans = await getSubscriptionPlansApi();
    dispatch(setSubscriptionPlans(getFetched(plans)));
  } catch (error) {
    console.error(error);
    dispatch(setSubscriptionPlans(getError(error)));
  }
};

export const fetchMyCurrentSubscription = () => (dispatch, getState) => {
  const state = getState();
  const myCurrentSubscription = myCurrentSubscriptionSelector(state);
  const token = tokenSelector(state);

  dispatch(setMyCurrentSubscription(toFetching(myCurrentSubscription)));

  const fetcher = queryMyCurrentSubscriptionApi(token);

  return fetcher()
    .then(currentSubscription => {
      dispatch(setMyCurrentSubscription(getFetched(currentSubscription)));
    })
    .catch(error => {
      console.error(error);
      dispatch(setMyCurrentSubscription(getError(error)));
    });
};
