// TODO: 暫時放在這裡，之後搬回 api/
export interface JobTitle {
  name: string;
}

export const queryJobTitles = /* GraphQL */ `
  query($key: String!) {
    job_titles(query: $key, page: 0) {
      name
    }
  }
`;

export const queryJobTitlesHavingDataGql = /* GraphQL */ `
  query($start: Int!, $limit: Int!) {
    jobTitlesHavingData(start: $start, limit: $limit) {
      name
    }
    jobTitlesHavingDataCount
  }
`;
