import graphqlClient from 'utils/graphqlClient';

const queryPermissionGql = /* GraphQL */ `
  {
    me {
      permission {
        hasAllPermission
      }
    }
  }
`;

type QueryPermissionData = {
  me: {
    permission: {
      hasAllPermission: boolean;
    };
  };
};

const queryPermission = ({ token }: { token: string }): Promise<boolean> =>
  graphqlClient<QueryPermissionData>({
    query: queryPermissionGql,
    token,
  }).then(
    ({
      me: {
        permission: { hasAllPermission },
      },
    }) => hasAllPermission,
  );

export default queryPermission;
