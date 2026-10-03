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
  status: 'published' | 'hidden';
  token?: string;
}): Promise<void> =>
  graphqlClient<ChangeReplyStatusData>({
    query: changeReplyStatusGql,
    variables: { input: { id, status } },
    token,
  }).then(() => undefined);

export default changeReplyStatus;
