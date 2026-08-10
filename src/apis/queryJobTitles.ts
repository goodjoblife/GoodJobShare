import graphqlClient from 'utils/graphqlClient';

const queryJobTitlesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    jobTitlesHavingData(start: $start, limit: $limit) {
      name
    }
    jobTitlesHavingDataCount
  }
`;

export type JobTitleInIndex = {
  name: string;
};

type QueryJobTitlesData = {
  jobTitlesHavingData: JobTitleInIndex[];
  jobTitlesHavingDataCount: number;
};

const queryJobTitles = ({
  start,
  limit,
}: {
  start: number;
  limit: number;
}): Promise<QueryJobTitlesData> =>
  graphqlClient<QueryJobTitlesData>({
    query: queryJobTitlesHavingDataGql,
    variables: { start, limit },
  });

export default queryJobTitles;
