import graphqlClient from 'utils/graphqlClient';

const deleteReplyLikeGql = /* GraphQL */ `
  mutation($input: DeleteReplyLikeInput!) {
    deleteReplyLike(input: $input) {
      deletedReplyId
    }
  }
`;

type DeleteReplyLikeData = {
  deleteReplyLike: { deletedReplyId: string };
};

const deleteReplyLike = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<DeleteReplyLikeData['deleteReplyLike']> =>
  graphqlClient<DeleteReplyLikeData>({
    query: deleteReplyLikeGql,
    variables: { input: { reply_id: id } },
    token,
  }).then(data => data.deleteReplyLike);

export default deleteReplyLike;
