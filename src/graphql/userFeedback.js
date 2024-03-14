export const createUserFeedback = `
mutation CreateUserFeedback(input: CreateUserFeedbackInput!) {
  createUserFeedback(input: $input) {
    id
    npsScore
    content
    userId
  }
}`;
