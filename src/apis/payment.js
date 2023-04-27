import graphqlClient from 'utils/graphqlClient';
import {
  subscriptionPlans,
  checkoutSubscriptionWithPrimeMutation,
  paymentRecord,
} from 'graphql/payment';

const getSubscriptionPlans = () =>
  graphqlClient({
    query: subscriptionPlans,
  }).then(({ subscriptionPlans }) => {
    return subscriptionPlans;
  });

export const checkoutSubscriptionWithPrime = ({
  prime,
  skuId,
  isPrime,
  token,
}) =>
  graphqlClient({
    query: checkoutSubscriptionWithPrimeMutation,
    variables: {
      input: {
        prime,
        skuId,
        isPrime,
      },
    },
    token,
  }).then(
    ({
      checkoutSubscriptionWithPrime: {
        paymentRecord: { id },
        paymentUrl,
        error: { message } = {},
      },
    }) => [message, id, paymentUrl],
  );

const getPaymentRecord = token => paymentRecordId =>
  graphqlClient({
    query: paymentRecord,
    variables: {
      id: paymentRecordId,
    },
    token,
  }).then(({ paymentRecord }) => paymentRecord);

export default {
  checkoutSubscriptionWithPrime,
  getSubscriptionPlans,
  getPaymentRecord,
};
