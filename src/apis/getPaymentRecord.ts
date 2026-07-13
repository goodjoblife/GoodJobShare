import { SubscriptionPlan } from 'apis/getSubscriptionPlans';
import { PaymentRecordStatus, SubscriptionStatus } from 'apis/payment';
import graphqlClient from 'utils/graphqlClient';

const getPaymentRecordGql = /* GraphQL */ `
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

export type PaymentRecord = {
  id: string;
  userId: string;
  publicId: string;
  status: PaymentRecordStatus;
  paymentMethodSnapshot: { id: string } | null;
  subscription: {
    id: string;
    startedAt: string;
    expiredAt: string;
    status: SubscriptionStatus;
    subscriptionPlan: SubscriptionPlan;
  };
  amount: number;
};

type QueryGetPaymentRecordData = {
  paymentRecord: PaymentRecord | null;
};

const getPaymentRecord = (token?: string) => (
  paymentRecordId: string,
): Promise<PaymentRecord | null> =>
  graphqlClient<QueryGetPaymentRecordData>({
    query: getPaymentRecordGql,
    variables: {
      id: paymentRecordId,
    },
    token,
  }).then(data => data.paymentRecord);

export default getPaymentRecord;
