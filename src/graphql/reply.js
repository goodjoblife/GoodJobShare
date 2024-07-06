export const createReplyLike = /* GraphQL */ `
  mutation($input: CreateReplyLikeInput!) {
    createReplyLike(input: $input) {
      replyLike {
        id
      }
    }
  }
`;

export const deleteReplyLike = /* GraphQL */ `
  mutation($input: DeleteReplyLikeInput!) {
    deleteReplyLike(input: $input) {
      deletedReplyId
    }
  }
`;
