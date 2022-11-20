import R from 'ramda';
import graphqlClient from 'utils/graphqlClient';
import {
  getJobTitleQuery,
  getJobTitlesHavingDataQuery,
} from 'graphql/jobTitle';

export const getJobTitle = jobTitle =>
  graphqlClient({
    query: getJobTitleQuery,
    variables: { jobTitle },
  }).then(R.prop('job_title'));

export const getJobTitles = () =>
  graphqlClient({ query: getJobTitlesHavingDataQuery })
    .then(R.prop('job_titles_having_data'))
    .then(R.map(R.prop('name')));

export default {
  getJobTitle,
  getJobTitles,
};
