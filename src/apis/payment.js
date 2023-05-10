import graphqlClient from 'utils/graphqlClient';
import {
  subscriptionPlans,
  checkoutSubscriptionWithPrimeMutation,
  paymentRecord,
  myCurrentSubscription as myCurrentSubscriptionQuery,
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
  }).then(({ checkoutSubscriptionWithPrime: { paymentUrl } }) => paymentUrl);

const getPaymentRecord = token => paymentRecordId =>
  graphqlClient({
    query: paymentRecord,
    variables: {
      id: paymentRecordId,
    },
    token,
  }).then(({ paymentRecord }) => paymentRecord);

const getMyCurrentSubscription = token => () =>
  graphqlClient({
    query: myCurrentSubscriptionQuery,
    token,
  });

export default {
  checkoutSubscriptionWithPrime,
  getSubscriptionPlans,
  getPaymentRecord,
  getMyCurrentSubscription,
};
