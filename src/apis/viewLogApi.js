import graphqlClient from 'utils/graphqlClient';
import {
  viewSalaryWorkTimesGql,
  viewExperiencesGql,
  traceEventGql,
} from 'graphql/viewLog';

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

export const traceEventApi = ({
  token,
  action,
  contentId,
  contentType,
  referrer,
}) =>
  graphqlClient({
    query: traceEventGql,
    token,
    variables: { input: { action, contentId, contentType, referrer } },
  });
