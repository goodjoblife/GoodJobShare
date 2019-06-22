import graphqlClient from 'utils/graphqlClient';
import { viewSalaryWorkTimes as viewSalaryWorkTimesGql } from 'graphql/viewLog';

const viewSalaryWorkTimes = ({ token, content_ids, referrer = null }) =>
  graphqlClient({
    query: viewSalaryWorkTimesGql,
    token,
    variables: {
      input: {
        content_ids,
        referrer,
      },
    },
  });

export default {
  viewSalaryWorkTimes,
};
