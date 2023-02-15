import graphqlClient from 'utils/graphqlClient';
import { getMyPermissionQuery } from 'graphql/permission';

export const getHasSearchPermission = ({ token }) =>
  graphqlClient({ query: getMyPermissionQuery, token }).map(
    ({ myPermission: { hasAllPermission } }) => hasAllPermission,
  );
