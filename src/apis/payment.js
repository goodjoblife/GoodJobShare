import graphqlClient from 'utils/graphqlClient';
import { subscriptionPlans } from 'graphql/payment';

const getSubscriptionPlans = () =>
  graphqlClient({
    query: subscriptionPlans,
  }).then(({ subscriptionPlans }) => {
    return subscriptionPlans;
  });

export default {
  getSubscriptionPlans,
};
