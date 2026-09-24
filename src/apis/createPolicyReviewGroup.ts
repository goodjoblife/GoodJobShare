import graphqlClient from 'utils/graphqlClient';

const createPolicyReviewGroupGql = /* GraphQL */ `
  mutation CreatePolicyReviewGroup($input: CreatePolicyReviewGroupInput!) {
    createPolicyReviewGroup(input: $input) {
      success
    }
  }
`;

type CreatePolicyReviewGroupData = {
  createPolicyReviewGroup: {
    success: boolean;
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
