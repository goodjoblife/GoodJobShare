import graphqlClient from 'utils/graphqlClient';

const changePolicyReviewGroupStatusGql = /* GraphQL */ `
  mutation ChangePolicyReviewGroupStatus(
    $input: ChangePolicyReviewGroupStatusInput!
  ) {
    changePolicyReviewGroupStatus(input: $input) {
      success
    }
  }
`;

type ChangePolicyReviewGroupStatusData = {
  changePolicyReviewGroupStatus: {
    success: boolean;
  };
};

export type PublishStatus = 'published' | 'hidden';

const changePolicyReviewGroupStatus = ({
  groupId,
  status,
  token,
}: {
  groupId: string;
  status: PublishStatus;
  token?: string;
}): Promise<
  ChangePolicyReviewGroupStatusData['changePolicyReviewGroupStatus']
> =>
  graphqlClient<ChangePolicyReviewGroupStatusData>({
    query: changePolicyReviewGroupStatusGql,
    variables: { input: { groupId, status } },
    token,
  }).then(data => data.changePolicyReviewGroupStatus);

export default changePolicyReviewGroupStatus;
