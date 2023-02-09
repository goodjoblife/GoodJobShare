export const checkoutSubscriptionWithPrimeMutation = `
  mutation($input: CheckoutSubscriptionWithPrimeInput!) {
    checkoutSubscriptionWithPrime(input: $input) {
      paymentUrl
    }
  }
`;

export const subscriptionPlans = `
  query {
    subscriptionPlans {
      skuId
      title
      description
      type
      amount
      duration {
        type
        amount
      }
    }
  }
`;
