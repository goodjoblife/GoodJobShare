import { queryMyPublishesGql, queryMyPublishIdsGql } from 'graphql/me';
import graphqlClient from 'utils/graphqlClient';

export const queryMyPublishIdsApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishIdsGql, token }).then(data => [
    ...data.me.experiences.map(({ id }) => id),
    ...data.me.salary_work_times.map(({ id }) => id),
    ...data.me.policyReviewGroupList.flatMap(({ policyReviews }) =>
      policyReviews.map(({ id }) => id),
    ),
  ]);

export const queryMyPublishesApi = ({ token }) =>
  graphqlClient({ query: queryMyPublishesGql, token });
