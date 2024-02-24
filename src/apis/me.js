import graphqlClient from 'utils/graphqlClient';
import {
  queryMeGql,
  queryMyPublishesGql,
  queryMyPermissionGql,
} from 'graphql/me';

export const queryHasSearchPermissionApi = ({ token }) =>
  graphqlClient({ query: queryMyPermissionGql, token }).then(
    ({
      me: {
        permission: { hasAllPermission },
      },
    }) => hasAllPermission,
  );

export const queryMeApi = ({ token }) =>
  graphqlClient({ query: queryMeGql, token }).then(data => data.me);

export const queryMyPublishesApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishesGql, token });
