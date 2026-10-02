import graphqlClient from 'utils/graphqlClient';

const createReplyLikeGql = /* GraphQL */ `
  mutation($input: CreateReplyLikeInput!) {
    createReplyLike(input: $input) {
      replyLike {
        id
      }
    }
  }
`;

type CreateReplyLikeData = {
  createReplyLike: { replyLike: { id: string } };
};

const createReplyLike = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<CreateReplyLikeData['createReplyLike']> =>
  graphqlClient<CreateReplyLikeData>({
    query: createReplyLikeGql,
    variables: { input: { reply_id: id } },
    token,
  }).then(data => data.createReplyLike);

export default createReplyLike;
