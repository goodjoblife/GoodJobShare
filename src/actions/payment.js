export const SET_BACK_URL = '@@PAYMENT/SET_BACK_URL';
export const SET_PAYMENT_RECORD = '@@PAYMENT/SET_PAYMENT_RECORD';

export const setBackUrl = url => ({
  type: SET_BACK_URL,
  url,
});

export const setPaymentRecord = paymentId => (dispatch, getState, { api }) => {
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
