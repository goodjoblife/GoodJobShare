export const facebookLogin = `
mutation($input: FacebookLoginInput!) {
  facebookLogin(input: $input) {
    user {
      _id
      facebook_id
    }
    token
  }
}
`;

export const googleLogin = `
mutation($input: GoogleLoginInput!) {
  googleLogin(input: $input) {
    user {
      _id
      google_id
    }
    token
  }
}
`;
