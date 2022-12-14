export const SET_REDIRECT_URL = '@@PAYMENT/SET_REDIRECT_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';

export const setRedirectUrl = url => ({
  type: SET_REDIRECT_URL,
  url,
});

export const navigateToBuy = redirectUrl => (
  dispatch,
  getState,
  { history },
) => {
  history.push('/buy');
  dispatch(setRedirectUrl(redirectUrl));
};

export const fetchPaymentRecord = paymentId => (
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
