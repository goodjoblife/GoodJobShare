import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import { getJobTitleQuery } from 'graphql/jobTitle';

export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export default {
  getJobTitle,
};
