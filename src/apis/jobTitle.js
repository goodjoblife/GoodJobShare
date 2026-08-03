import { queryJobTitlesHavingDataGql } from 'graphql/jobTitle';
import graphqlClient from 'utils/graphqlClient';

export const queryJobTitlesApi = ({ start, limit }) =>
  graphqlClient({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });
