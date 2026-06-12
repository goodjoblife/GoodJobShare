import { User } from 'reducers/auth';
import graphqlClient from 'utils/graphqlClient';

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
