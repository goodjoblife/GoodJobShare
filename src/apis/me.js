import graphqlClient from 'utils/graphqlClient';

import {
  queryMeGql,
  queryMyExperienceIdsGql,
  queryMySalaryWorkTimesIdsGql,
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

export const queryMySalaryWorkTimesIdsApi = ({ token }) =>
  graphqlClient({ query: queryMySalaryWorkTimesIdsGql, token }).then(data =>
    data.me.salary_work_times.map(({ id }) => id),
  );

export const queryMyPublishesApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishesGql, token });
