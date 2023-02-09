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
    }
  }
`;

export const paymentRecord = `
  query($id: ID!) {
    paymentRecord(id: $id) {
      id
      userId
      publicId
      status
      paymentMethodSnapshot {
        id
      }
      subscription {
        id
        startedAt
        expiredAt
        status
        subscriptionPlan {
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
      amount
    }
  }
`;
