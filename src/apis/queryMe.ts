import graphqlClient from 'utils/graphqlClient';
import { User } from 'reducers/auth';

const queryMeGql = /* GraphQL */ `
  {
    me {
      _id
      name
      email
    }
  }
`;

type QueryMeData = {
  me: User;
};

const queryMe = ({ token }: { token?: string }): Promise<User> =>
  graphqlClient<QueryMeData>({ query: queryMeGql, token }).then(
    data => data.me,
  );

export default queryMe;
