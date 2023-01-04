export const SET_REDIRECT_URL = '@@PAYMENT/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';

const setRedirectUrl = redirectUrl => ({
  type: SET_REDIRECT_URL,
  redirectUrl,
});

export const navigateToBuy = (redirectUrl, actionUrl) => (
  dispatch,
  getState,
  { history },
) => {
  history.push(actionUrl);
  dispatch(setRedirectUrl(redirectUrl));
};

export const fetchPaymentRecord = paymentRecordId => (
  dispatch,
  getState,
  { api },
) => {
  return Promise.resolve({
    id: 1,
    publicId: '221116-123456',
    status: 'PendingAuthorization',
    paymentMethodSnapshot: {},
    amount: 399,
    createdAt: new Date(),
    updated_at: new Date(),
  }).then(paymentRecord => {
    dispatch({
      type: SET_PAYMENT_RECORD,
      paymentRecord,
    });
  });
};
