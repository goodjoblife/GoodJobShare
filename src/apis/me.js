import graphqlClient from 'utils/graphqlClient';

import {
  queryMeGql,
  queryMyExperienceIdsGql,
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

export const queryMyExperienceIdsApi = ({ token }) =>
  graphqlClient({ query: queryMyExperienceIdsGql, token }).then(data =>
    data.me.experiences.map(({ id }) => id),
  );

export const queryMyPublishesApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishesGql, token });
