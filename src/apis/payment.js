import graphqlClient from 'utils/graphqlClient';
import { checkoutSubscriptionWithPrimeMutation } from 'graphql/payment';

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
};
