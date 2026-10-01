import { PolicyReview } from 'constants/policy';
import graphqlClient from 'utils/graphqlClient';

const queryPolicyReviewGroupGql = /* GraphQL */ `
  query PolicyReviewGroup($groupId: ID!) {
    me {
      policyReviewGroup(groupId: $groupId) {
        groupId
        company {
          name
        }
        jobTitle
        sector
        createdAt
        policyReviews {
          policy
          hasPolicy
          compliance
          remoteWorkPolicy
          review
        }
      }
    }
  }
`;

export type PolicyReviewGroup = {
  groupId: string;
  company: { name: string };
  jobTitle: string;
  sector: string | null;
  createdAt: string;
  policyReviews: PolicyReview[];
};

type QueryPolicyReviewGroupData = {
  me: {
    policyReviewGroup: PolicyReviewGroup;
  };
};

const queryPolicyReviewGroup = ({
  groupId,
  token,
}: {
  groupId: string;
  token?: string;
}): Promise<QueryPolicyReviewGroupData['me']['policyReviewGroup']> =>
  graphqlClient<QueryPolicyReviewGroupData>({
    query: queryPolicyReviewGroupGql,
    variables: { groupId },
    token,
  }).then(data => data.me.policyReviewGroup);

export default queryPolicyReviewGroup;
