import graphqlClient from 'utils/graphqlClient';
import { viewSalaryWorkTimesGql, viewExperiencesGql } from 'graphql/viewLog';

export const viewSalaryWorkTimesApi = ({
  token,
  contentIds,
  referrer = null,
}) =>
  graphqlClient({
    query: viewSalaryWorkTimesGql,
    token,
    variables: {
      input: {
        content_ids: contentIds,
        referrer,
      },
    },
  });

export const viewExperiencesApi = ({ token, contentIds, referrer = null }) =>
  graphqlClient({
    query: viewExperiencesGql,
    token,
    variables: {
      input: {
        content_ids: contentIds,
        referrer,
      },
    },
  });
