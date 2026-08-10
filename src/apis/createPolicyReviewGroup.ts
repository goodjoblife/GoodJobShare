import graphqlClient from 'utils/graphqlClient';

const createPolicyReviewGroupGql = /* GraphQL */ `
  mutation CreatePolicyReviewGroup($input: CreatePolicyReviewGroupInput!) {
    createPolicyReviewGroup(input: $input) {
      success
      policyReviewGroup {
        policyReviews {
          id
          groupId
        }
      }
    }
  }
`;

type CreatePolicyReviewGroupData = {
  createPolicyReviewGroup: {
    success: boolean;
    policyReviewGroup: {
      policyReviews: {
        id: string;
        groupId: string;
      }[];
    };
  };
};

export type PolicyReviewInput = {
  policy: string;
  review?: string;
  hasPolicy: string;
  compliance?: string;
  remoteWorkPolicy?: string;
};

const createPolicyReviewGroup = ({
  company,
  jobTitle,
  sector,
  policyReviews,
  token,
}: {
  company: { query: string };
  jobTitle: string;
  sector?: string;
  policyReviews: PolicyReviewInput[];
  token?: string;
}): Promise<CreatePolicyReviewGroupData['createPolicyReviewGroup']> =>
  graphqlClient<CreatePolicyReviewGroupData>({
    query: createPolicyReviewGroupGql,
    variables: {
      input: { company, jobTitle, sector, policyReviews },
    },
    token,
  }).then(data => data.createPolicyReviewGroup);

export default createPolicyReviewGroup;
