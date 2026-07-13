import graphqlClient from 'utils/graphqlClient';

const getSubscriptionPlansGql = /* GraphQL */ `
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

export enum SubscriptionPlanType {
  SUBMIT_DATA = 'SubmitData',
  BUY_SUBSCRIPTION = 'BuySubscription',
  EARLY_LOYAL_USER_REWARD = 'EarlyLoyalUserReward',
  BONUS = 'Bonus',
}

export enum DurationType {
  DAY = 'Day',
  HOUR = 'Hour',
}

export type Duration = {
  type: DurationType;
  amount: number;
};

// Must be the same schema as
// ${getSubscriptionPlansGql}
export type SubscriptionPlan = {
  skuId: string;
  title: string | null;
  description: string | null;
  type: SubscriptionPlanType;
  amount: number;
  duration: Duration;
};

type QueryGetSubscriptionPlansData = {
  subscriptionPlans: SubscriptionPlan[];
};

const getSubscriptionPlans = (): Promise<SubscriptionPlan[]> =>
  graphqlClient<QueryGetSubscriptionPlansData>({
    query: getSubscriptionPlansGql,
  }).then(data => data.subscriptionPlans);

export default getSubscriptionPlans;
