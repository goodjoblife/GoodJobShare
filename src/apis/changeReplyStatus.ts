import { PublishStatus } from 'constants/publishStatus';
import graphqlClient from 'utils/graphqlClient';

const changeReplyStatusGql = /* GraphQL */ `
  mutation($input: ChangeReplyStatusInput!) {
    changeReplyStatus(input: $input) {
      reply {
        id
      }
    }
  }
`;

type ChangeReplyStatusData = {
  changeReplyStatus: { reply: { id: string } };
};

const changeReplyStatus = ({
  id,
  status,
  token,
}: {
  id: string;
  status: PublishStatus;
  token?: string;
}): Promise<ChangeReplyStatusData['changeReplyStatus']> =>
  graphqlClient<ChangeReplyStatusData>({
    query: changeReplyStatusGql,
    variables: { input: { id, status } },
    token,
  }).then(data => data.changeReplyStatus);

export default changeReplyStatus;
