import { AnyAction } from 'redux';

import getPaymentRecordApi, { PaymentRecord } from 'apis/getPaymentRecord';
import getSubscriptionPlansApi, {
  SubscriptionPlan,
} from 'apis/getSubscriptionPlans';
import queryMyCurrentSubscriptionApi, {
  CurrentSubscription,
} from 'apis/queryMyCurrentSubscription';
import { NOTIFICATION_TYPE } from 'constants/toastNotification';
import { Thunk } from 'reducers';
import { tokenSelector } from 'selectors/authSelector';
import {
  myCurrentSubscriptionSelector,
  paymentRecordSelector,
  redirectUrlSelector,
  subscriptionPlansSelector,
} from 'selectors/payment';
import FetchBox, {
  getError,
  getFetched,
  getUnfetched,
  isFetching,
  toFetching,
} from 'utils/fetchBox';
import { createToastLocationState } from 'utils/toastNotification';

export const SET_REDIRECT_URL = '@@PAYMENT_PERSIST/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';
export const SET_SUBSCRIPTION_PLANS = '@@PAYMENT/SET_PLANS';
export const SET_MY_CURRENT_SUBSCRIPTION =
  '@@PAYMENT/SET_MY_CURRENT_SUBSCRIPTION';

const setRedirectUrl = (redirectUrl: string | null): AnyAction => ({
  type: SET_REDIRECT_URL,
  redirectUrl,
});

const setPaymentRecord = (
  paymentRecord: FetchBox<PaymentRecord | null>,
): AnyAction => ({
  type: SET_PAYMENT_RECORD,
  paymentRecord,
});

const setSubscriptionPlans = (
  subscriptionPlans: FetchBox<SubscriptionPlan[]>,
): AnyAction => ({
  type: SET_SUBSCRIPTION_PLANS,
  subscriptionPlans,
});

const setMyCurrentSubscription = (
  currentSubscription: FetchBox<CurrentSubscription | null>,
): AnyAction => ({
  type: SET_MY_CURRENT_SUBSCRIPTION,
  currentSubscription,
});

export const navigateToBuy = (
  redirectUrl: string,
  actionUrl: string,
): Thunk => (dispatch, getState, { history }): void => {
  history.push(actionUrl);
  dispatch(setRedirectUrl(redirectUrl));
};

export const navigateToRedirectUrl = (): Thunk => (
  dispatch,
  getState,
  { history },
): void => {
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

export const fetchPaymentRecord = (paymentRecordId: string): Thunk => (
  dispatch,
  getState,
): Promise<void> => {
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

export const fetchSubscriptionPlans = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const plansBox = subscriptionPlansSelector(getState());

  if (isFetching(plansBox)) {
    return;
  }

  dispatch(setSubscriptionPlans(toFetching(plansBox)));

  try {
    const plans = await getSubscriptionPlansApi();
    return dispatch(setSubscriptionPlans(getFetched(plans)));
  } catch (error) {
    console.error(error);
    dispatch(setSubscriptionPlans(getError(error)));
  }
};

export const fetchMyCurrentSubscription = (): Thunk => (
  dispatch,
  getState,
): Promise<void> => {
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
