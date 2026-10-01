import { Policy, RemoteWorkPolicy, YesNoOrUnknown } from 'constants/policy';
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
  policy: Policy;
  review?: string;
  hasPolicy: YesNoOrUnknown;
  compliance?: YesNoOrUnknown;
  remoteWorkPolicy?: RemoteWorkPolicy;
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
