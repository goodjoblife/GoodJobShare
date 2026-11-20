import { PublishStatus } from 'constants/publishStatus';
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
  status: PublishStatus;
  token?: string;
}): Promise<void> =>
  graphqlClient<ChangePolicyReviewGroupStatusData>({
    query: changePolicyReviewGroupStatusGql,
    variables: { input: { groupId, status } },
    token,
  }).then(() => undefined);

export default changePolicyReviewGroupStatus;
