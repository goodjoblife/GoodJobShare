import graphqlClient from 'utils/graphqlClient';
import {
  subscriptionPlans,
  checkoutSubscriptionWithPrimeMutation,
  paymentRecord,
  myCurrentSubscription as myCurrentSubscriptionQuery,
  mySubscriptions as mySubscriptionsQuery,
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
        error,
      },
    }) => [error ? error.message : null, id, paymentUrl],
  );

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
  }).then(({ myCurrentSubscription }) => myCurrentSubscription);

const getMySubscriptions = token => () =>
  graphqlClient({
    query: mySubscriptionsQuery,
    token,
  }).then(({ mySubscriptions }) => mySubscriptions);

export default {
  checkoutSubscriptionWithPrime,
  getSubscriptionPlans,
  getPaymentRecord,
  getMyCurrentSubscription,
  getMySubscriptions,
};
