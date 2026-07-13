import { SubscriptionPlanType } from 'apis/getSubscriptionPlans';
import { SubscriptionStatus } from 'apis/payment';
import graphqlClient from 'utils/graphqlClient';

const queryMyCurrentSubscriptionGql = /* GraphQL */ `
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

export type CurrentSubscription = {
  id: string;
  status: SubscriptionStatus;
  expiredAt: string;
  subscriptionPlan: {
    title: string | null;
    description: string | null;
    type: SubscriptionPlanType;
    amount: number;
  };
};

type QueryMyCurrentSubscriptionData = {
  myCurrentSubscription: CurrentSubscription | null;
};

const queryMyCurrentSubscription = (
  token?: string,
) => (): Promise<CurrentSubscription | null> =>
  graphqlClient<QueryMyCurrentSubscriptionData>({
    query: queryMyCurrentSubscriptionGql,
    token,
  }).then(data => data.myCurrentSubscription);

export default queryMyCurrentSubscription;
