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

const changePolicyReviewGroupStatus = ({
  groupId,
  status,
  token,
}: {
  groupId: string;
  status: string;
  token?: string;
}): Promise<boolean> =>
  graphqlClient<ChangePolicyReviewGroupStatusData>({
    query: changePolicyReviewGroupStatusGql,
    variables: { input: { groupId, status } },
    token,
  }).then(data => data.changePolicyReviewGroupStatus.success);

export default changePolicyReviewGroupStatus;
