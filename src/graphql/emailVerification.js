export const sendVerifyEmail = /* GraphQL */ `
  mutation SendVerifyEmail($input: SendVerifyEmailInput!) {
    sendVerifyEmail(input: $input) {
      status
    }
  }
`;

export const verifyEmail = /* GraphQL */ `
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      token
      redirect_url
    }
  }
`;
