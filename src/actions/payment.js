export const SET_FROM_URL = '@@PAYMENT/SET_FROM_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';

export const setFromUrl = url => ({
  type: SET_FROM_URL,
  url,
});

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
    return dispatch({
      type: SET_PAYMENT_RECORD,
      paymentRecord,
    });
  });
};
