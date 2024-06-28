export { default as facebookLogin } from './facebookLogin.gql';

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
