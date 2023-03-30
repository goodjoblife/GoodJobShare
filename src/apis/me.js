import graphqlClient from 'utils/graphqlClient';

import {
  getMeQuery,
  getMyPublishesQuery,
  getMyPermissionQuery,
} from 'graphql/me';

const getHasSearchPermission = ({ token }) =>
  graphqlClient({ query: getMyPermissionQuery, token }).map(
    ({
      me: {
        permission: { hasAllPermission },
      },
    }) => hasAllPermission,
  );

const getMe = ({ token }) =>
  graphqlClient({ query: getMeQuery, token }).then(data => data.me);

const getMyPublishes = ({ token }) =>
  graphqlClient({ query: getMyPublishesQuery, token });

export default {
  getHasSearchPermission,
  getMe,
  getMyPublishes,
};
