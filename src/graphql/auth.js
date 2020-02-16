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
