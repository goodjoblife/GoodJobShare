export const sendVerifyEmail = `
  mutation SendVerifyEmail($sendVerifyEmailInput: SendVerifyEmailInput!) {
    sendVerifyEmail(input: $sendVerifyEmailInput) {
      status
    }
  }
`;

export const verifyEmail = `
  mutation SendVerifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput): {
      token
      redirect_url
    }
  }
`;
