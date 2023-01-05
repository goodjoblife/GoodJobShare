export const checkoutSubscriptionWithPrimeMutation = `
  mutation($input: CheckoutSubscriptionWithPrimeInput!) {
    checkoutSubscriptionWithPrime(input: $input) {
      paymentUrl
    }
  }
`;
