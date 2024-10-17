import graphqlClient from 'utils/graphqlClient';

import {
  queryMeGql,
  queryMyPublishIdsGql,
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

export const queryMyPublishIdsApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishIdsGql, token }).then(data => [
    ...data.me.experiences.map(({ id }) => id),
    ...data.me.salary_work_times.map(({ id }) => id),
  ]);

export const queryMyPublishesApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishesGql, token });
