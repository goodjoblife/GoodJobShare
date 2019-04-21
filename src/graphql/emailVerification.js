export const sendVerifyEmail = `
  mutation SendVerifyEmail($input: SendVerifyEmailInput!) {
    sendVerifyEmail(input: $input) {
      status
    }
  }
`;

export const verifyEmail = `
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      token
      redirect_url
    }
  }
`;
