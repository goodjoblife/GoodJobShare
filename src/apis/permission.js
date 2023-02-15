import graphqlClient from 'utils/graphqlClient';
import { getPermissionQuery } from 'graphql/permission';

export const getHasSearchPermission = ({ token }) =>
  graphqlClient({ query: getPermissionQuery, token }).map(
    ({ permission: { hasAllPermission } }) => hasAllPermission,
  );
