import graphqlClient from 'utils/graphqlClient';
import {
  subscriptionPlans,
  checkoutSubscriptionWithPrimeMutation,
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

export default {
  checkoutSubscriptionWithPrime,
  getSubscriptionPlans,
};
