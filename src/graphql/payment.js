export const checkoutSubscriptionWithPrimeMutation = `
  mutation($input: CheckoutSubscriptionWithPrimeInput!) {
    checkoutSubscriptionWithPrime(input: $input) {
      paymentRecord {
        id
      }
      paymentUrl
      error {
        message
      }
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

export const myCurrentSubscription = `
query {
  myCurrentSubscription {
    id
    status
    expiredAt
    subscriptionPlan {
      title
      description
      type
      amount
    }
  }
}
`;

export const mySubscriptions = `
query {
  mySubscriptions {
    id
    startedAt
    expiredAt
    createdAt
    status
    paymentRecord {
      publicId
      amount
    }
    subscriptionPlan {
      title
      description
    }
  }
}
`;
