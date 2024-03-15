export const createUserFeedback = `
mutation CreateUserFeedback($input: CreateUserFeedbackInput!) {
  createUserFeedback(input: $input) {
	npsScore
	content
	id
    userId
  }
}`;
