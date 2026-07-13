import { PaymentRecordStatus, SubscriptionStatus } from 'apis/payment';
import graphqlClient from 'utils/graphqlClient';

const queryMySubscriptionsGql = /* GraphQL */ `
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
        status
      }
      subscriptionPlan {
        title
        description
      }
    }
  }
`;

export type MySubscription = {
  id: string;
  startedAt: string;
  expiredAt: string;
  createdAt: string;
  status: SubscriptionStatus;
  paymentRecord: {
    publicId: string;
    amount: number;
    status: PaymentRecordStatus;
  } | null;
  subscriptionPlan: {
    title: string | null;
    description: string | null;
  };
};

type QueryMySubscriptionsData = {
  mySubscriptions: MySubscription[];
};

const queryMySubscriptions = (token?: string) => (): Promise<
  MySubscription[]
> =>
  graphqlClient<QueryMySubscriptionsData>({
    query: queryMySubscriptionsGql,
    token,
  }).then(data => data.mySubscriptions);

export default queryMySubscriptions;
