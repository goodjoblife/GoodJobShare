import graphqlClient from 'utils/graphqlClient';

import {
  getTaskAndRewardQuery,
  unlockExperienceQuery,
} from 'graphql/taskAndReward';

export const getTaskAndReward = () =>
  graphqlClient({ query: getTaskAndRewardQuery });

export const unlockExperience = ({ id, token }) =>
  graphqlClient({
    query: unlockExperienceQuery,
    variables: { input: id },
    token,
  });

export default {
  getTaskAndReward,
  unlockExperience,
};
