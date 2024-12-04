export const createUserFeedback = /* GraphQL */ `
  mutation CreateUserFeedback($input: CreateUserFeedbackInput!) {
    createUserFeedback(input: $input) {
      npsScore
      content
    }
  }
`;
