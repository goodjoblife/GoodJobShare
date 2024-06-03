import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleQuery,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';

export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = (start, limit) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
