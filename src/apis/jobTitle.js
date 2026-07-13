import R from 'ramda';

import {
  getJobTitleInterviewExperiencesQuery,
  queryJobTitlesHavingDataGql,
} from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

export const getJobTitleInterviewExperiences = ({
  jobTitle,
  companyName,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getJobTitleInterviewExperiencesQuery,
    variables: { jobTitle, companyName, start, limit, sortBy },
  }).then(R.prop('job_title'));

export const queryJobTitlesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
