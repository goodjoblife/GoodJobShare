export const createReplyLike = `
mutation($input:CreateReplyLikeInput!) {
  createReplyLike(input: $input) {
    replyLike {
      id
    }
  }
}
`;

export const deleteReplyLike = `
mutation($input:DeleteReplyLikeInput!) {
  deleteReplyLike(input: $input) {
    deletedReplyId
  }
}
`;
