import R from 'ramda';

import { getCompanyInterviewExperiencesQuery } from 'graphql/company';
import graphqlClient from 'utils/graphqlClient';

export const getCompanyInterviewExperiences = ({
  companyName,
  jobTitle,
  start,
  limit,
  sortBy,
}) =>
  graphqlClient({
    query: getCompanyInterviewExperiencesQuery,
    variables: { companyName, jobTitle, start, limit, sortBy },
  }).then(R.prop('company'));
