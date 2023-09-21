import graphqlClient from '../utils/graphqlClient';
import { queryJobTitles } from '../graphql/jobTitle';

export const getJobTitlesSearch = ({ key }) =>
  graphqlClient({
    query: queryJobTitles,
    variables: {
      key,
    },
  }).then(({ job_titles }) => job_titles.map(({ name }) => name));
