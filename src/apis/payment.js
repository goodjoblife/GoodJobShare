import graphqlClient from 'utils/graphqlClient';
import {
  subscriptionPlans,
  checkoutSubscriptionWithPrimeMutation,
  paymentRecord,
  queryMyCurrentSubscriptionGql,
  queryMySubscriptionsGql,
} from 'graphql/payment';

export const getSubscriptionPlans = () =>
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

export const getPaymentRecord = token => paymentRecordId =>
  graphqlClient({
    query: paymentRecord,
    variables: {
      id: paymentRecordId,
    },
    token,
  }).then(({ paymentRecord }) => paymentRecord);

export const queryMyCurrentSubscriptionApi = token => () =>
  graphqlClient({
    query: queryMyCurrentSubscriptionGql,
    token,
  }).then(({ myCurrentSubscription }) => myCurrentSubscription);

export const queryMySubscriptionsApi = token => () =>
  graphqlClient({
    query: queryMySubscriptionsGql,
    token,
  }).then(({ mySubscriptions }) => mySubscriptions);
