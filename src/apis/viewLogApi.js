import graphqlClient from 'utils/graphqlClient';
import {
  viewSalaryWorkTimes as viewSalaryWorkTimesGql,
  viewExperiences as viewExperiencesGql,
} from 'graphql/viewLog';

const viewSalaryWorkTimes = ({ token, contentIds, referrer = null }) =>
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

const viewExperiences = ({ token, contentIds, referrer = null }) =>
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

export default {
  viewSalaryWorkTimes,
  viewExperiences,
};
