import graphqlClient from 'utils/graphqlClient';

const checkoutSubscriptionWithPrimeGql = /* GraphQL */ `
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

export enum SkuIdType {
  PLAN_30_DAYS = 'plan_30_days',
  PLAN_90_DAYS = 'plan_90_days',
}

type QueryCheckoutSubscriptionWithPrimeData = {
  checkoutSubscriptionWithPrime: {
    paymentRecord: { id: string };
    paymentUrl: string | null;
    error: { message: string } | null;
  };
};

const checkoutSubscriptionWithPrime = ({
  prime,
  skuId,
  isPrime,
  token,
}: {
  prime: string;
  skuId: SkuIdType;
  isPrime?: boolean;
  token?: string;
}): Promise<[string | null, string, string | null]> =>
  graphqlClient<QueryCheckoutSubscriptionWithPrimeData>({
    query: checkoutSubscriptionWithPrimeGql,
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
    }): [string | null, string, string | null] => [
      error ? error.message : null,
      id,
      paymentUrl,
    ],
  );

export default checkoutSubscriptionWithPrime;
